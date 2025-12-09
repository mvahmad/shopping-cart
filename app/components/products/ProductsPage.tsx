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


interface Props {
  searchParams: Record<string, string | undefined>;
  initialProducts: getProductsResponse;
  initialCategoryId: string;
  initialSubcategoryId: string;
}

export default function ProductsPageComponent({
  searchParams,
  initialProducts,
  initialCategoryId,
  initialSubcategoryId,
}: Props) {
  const { handlePageChange } = useTableSort();

  //for search
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedLeagueId, setSelectedLeagueId] = useState<string>(initialCategoryId);
  const [selectedTeamId, setSelectedTeamId] = useState<string>(initialSubcategoryId);

  // URL params
  const paramsObj = new URLSearchParams(searchParams as Record<string, string>);

  const limit = paramsObj.get("limit") || "5";
  const [page, setPage] = useState<number>(Number(paramsObj.get("page")) || 1);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedLeagueId, selectedTeamId]);

  // Categories
  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });
  const categories = categoryData?.data.categories;

  // Subcategories
  const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubCategories", selectedLeagueId],
    queryFn: () => getSubcategoriesByCategoryId(selectedLeagueId),
    enabled: !!selectedLeagueId,
  });

  const subItems = subCategoryData?.data.subcategories;

  // Set default subcategory when category changes
  useEffect(() => {
    if (subItems?.length) {
      setSelectedTeamId(subItems[0]._id);
    }
  }, [subItems]);

  // Products
  const productQueryKey = ["GetProducts", page, limit, selectedLeagueId, selectedTeamId];
  const { data: productData, isLoading } = useGetServices<getProductsResponse>({
    queryKey: productQueryKey,
    queryFn: () =>
      getProducts({
        page,
        limit,
        category: selectedLeagueId,
        subcategory: selectedTeamId,
      }),
    initialData:
      page === 1 &&
      selectedLeagueId === initialCategoryId &&
      selectedTeamId === initialSubcategoryId
        ? initialProducts
        : undefined,
    enabled: !!selectedLeagueId && !!selectedTeamId,
  });

  const items: ProductsEntity[] = productData?.data.products || [];
  const rowsPerPage = productData?.per_page ?? 5;
  const pages = useMemo(() => {
    return productData?.total ? Math.ceil(productData.total / rowsPerPage) : 0;
  }, [productData?.total, rowsPerPage]);

  // Filtered items based on search term
  const filteredItems = items.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  onClick={() => setSelectedLeagueId(item._id)}
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
                  onClick={() => setSelectedTeamId(item._id)}
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
          {isLoading ? (
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
