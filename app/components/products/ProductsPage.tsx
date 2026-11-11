"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "../ui/header";
import Footer from "../ui/footer";
import ProductCard from "../ui/ProductCard";
import { Pagination } from "@nextui-org/react";

import { useGetServices } from "@/app/hooks/useGetServices";
import { CategoriesResponse, ProductsEntity, SubcategoriesResponse, getProductsResponse } from "@/app/types";
import { useTableSort } from "@/app/hooks/useTabelSort";
import EmptyState from "../ui/EmptyState";
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
import { getSubcategoriesByCategoryId } from "@/app/hooks/queryHooks/getSubCategoris";
import { getProducts } from "@/app/hooks/queryHooks/products";
import Search from "../search/search";
import { productsQueryKey } from "./queryKeys";


interface Props {
  searchParams: Record<string, string | undefined>;
  initialCategoryId: string;
  initialSubcategoryId: string;
}

export default function ProductsPageComponent({
  searchParams,
  initialCategoryId,
  initialSubcategoryId,
}: Props) {
  const { handlePageChange } = useTableSort();

  //for search
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedLeagueId, setSelectedLeagueId] = useState<string>(initialCategoryId);
  const [selectedTeamId, setSelectedTeamId] = useState<string>(initialSubcategoryId);

  // URL params
  const limit = searchParams.limit || "5";
  const [page, setPage] = useState<number>(Number(searchParams.page) || 1);

  // Categories
  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });
  const categories = categoryData?.data.categories;

  // Fall back to the first category if the server could not provide one.
  useEffect(() => {
    if (!selectedLeagueId && categories?.length) {
      setSelectedLeagueId(categories[0]._id);
    }
  }, [categories, selectedLeagueId]);

  // Subcategories
  const { data: subCategoryData, isFetching: isSubFetching } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubCategories", selectedLeagueId],
    queryFn: () => getSubcategoriesByCategoryId(selectedLeagueId),
    enabled: !!selectedLeagueId,
  });

  const subItems = subCategoryData?.data.subcategories;

  // Select the first subcategory once the subcategories of a new category load
  useEffect(() => {
    if (subItems?.length && !subItems.some((s) => s._id === selectedTeamId)) {
      setSelectedTeamId(subItems[0]._id);
    }
  }, [subItems, selectedTeamId]);

  const selectLeague = (id: string) => {
    if (id === selectedLeagueId) return;
    setSelectedLeagueId(id);
    // Clear the team so we never query a team that belongs to another league.
    setSelectedTeamId("");
    setPage(1);
  };

  const selectTeam = (id: string) => {
    if (id === selectedTeamId) return;
    setSelectedTeamId(id);
    setPage(1);
  };

  // Products: wait until the subcategories of the selected category are known
  // so the (category, subcategory) pair is always consistent.
  const teamReady = !!selectedTeamId || (!!subCategoryData && !isSubFetching && !subItems?.length);
  const { data: productData, isLoading } = useGetServices<getProductsResponse>({
    queryKey: [...productsQueryKey(page, limit, selectedLeagueId, selectedTeamId)],
    queryFn: () =>
      getProducts({
        page,
        limit,
        category: selectedLeagueId,
        subcategory: selectedTeamId || undefined,
      }),
    enabled: !!selectedLeagueId && teamReady,
  });

  const items: ProductsEntity[] = productData?.data.products || [];
  const rowsPerPage = productData?.per_page ?? 5;
  const pages = useMemo(() => {
    return productData?.total ? Math.ceil(productData.total / rowsPerPage) : 0;
  }, [productData?.total, rowsPerPage]);

  // Filtered items based on search term
  const term = searchTerm.trim().toLowerCase();
  const filteredItems = term
    ? items.filter((product) => product.name?.toLowerCase().includes(term))
    : items;

  return (
    <main dir="rtl" className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
        {/* Title */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">محصولات</h1>
          <p className="mt-1 text-sm text-slate-500">
            لیگ و تیم مورد نظر را انتخاب کنید یا جستجوکنید تا محصولات مرتبط نمایش داده شوند.
          </p>
          <Search onSearch={setSearchTerm} />
        </header>

        {/* League Picker */}
        <section className="mb-4">
          <div className="flex flex-wrap gap-2">
            {categories?.map((item) => {
              const active = item._id === selectedLeagueId;
              return (
                <button
                  key={item._id}
                  onClick={() => selectLeague(item._id)}
                  className={`rounded-2xl border px-3 py-2 text-sm font-bold transition ${
                    active
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="mt-4 h-px w-full bg-slate-200" />
        </section>

        {/* Subcategory Picker */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2">
            {subItems?.map((item) => {
              const active = item._id === selectedTeamId;
              return (
                <button
                  key={item._id}
                  onClick={() => selectTeam(item._id)}
                  className={`rounded-2xl border px-3 py-2 text-sm font-bold transition ${
                    active
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Product Grid */}
        <section>
          {isLoading || (!!selectedLeagueId && !teamReady) ? (
              <EmptyState message="در حال بارگذاری..." />
            ) : filteredItems.length === 0 ? (
              <EmptyState message="هیچ محصولی مطابق جستجو پیدا نشد." />
            ) : (
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 md:gap-6">
                {filteredItems.map((p) => (
                  <ProductCard key={p._id} p={p} />
                ))}
              </div>
          )}

        </section>

        {/* Pagination */}
        {pages > 0 && (
          <div className="flex w-full justify-center mt-2">
            <Pagination
              dir="rtl"

              showControls
              size="sm"
              showShadow
              radius="md"
              color="primary"
              page={page}
              total={pages}
              onChange={(p) => {
                setPage(p);
                handlePageChange(p);
              }}
            />
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
