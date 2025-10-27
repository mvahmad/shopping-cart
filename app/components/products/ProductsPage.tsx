"use client";
import { renderItem } from "@/utils/paginationRenderItem";
import { useMemo, useState } from "react";
import Header from "../ui/header";
import Footer from "../ui/footer";
import ProductCard from "../ui/ProductCard";
import { Pagination } from "@nextui-org/react";
// 
import { getProducts } from "@/app/hooks/queryHooks/products";
import { useGetServices } from "@/app/hooks/useGetServices";
import { CategoriesResponse, getProductsResponse, ProductsEntity, SubcategoriesResponse } from "@/app/types";
import { useTableSort } from "@/app/hooks/useTabelSort";
import EmptyState from "../ui/EmptyState";
import { getSubcategoriesByCategoryId } from "@/app/hooks/queryHooks/getSubCategoris";
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";

interface Props {
  searchParams: Record<string, string | undefined>;
}

export default function ProductsPageComponent({ searchParams }: Props) {
  const [selectedLeagueId, setSelectedLeagueId] = useState("676e9b5f41325d2d8ea64438");
  const [selectedTeamId, setSelectedTeamId] = useState("68e2c9a2277282b14b86ddbb");

  const { handlePageChange } = useTableSort();

  const paramsObj = new URLSearchParams(searchParams as Record<string, string>);

  const limit = paramsObj.get("limit") || "5";
  const page = Number(paramsObj.get("page")) || 1;

  const params = {
    page,
    limit,
    subcategory: selectedTeamId,
    category: selectedLeagueId,
  };

  //  get categories
  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });
  const categories = categoryData?.data.categories;

  //  get subcategories
  const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubCategories", selectedLeagueId],
    queryFn: () => getSubcategoriesByCategoryId(selectedLeagueId),
  });

  //  get products
  const { data, isLoading } = useGetServices<getProductsResponse>({
    queryKey: ["GetProducts", params],
    queryFn: () => getProducts(params),
  });

  const subItems = subCategoryData?.data.subcategories;
  const items: ProductsEntity[] = data?.data.products || [];

  const rowsPerPage = data?.per_page ?? 5;
  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage]);

  return (
    <main dir="rtl" className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
        {/* Title */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">محصولات</h1>
          <p className="mt-1 text-sm text-slate-500">
            لیگ و تیم مورد نظر را انتخاب کنید تا محصولات مرتبط نمایش داده شوند.
          </p>
        </header>

        {/* League picker */}
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

        {/* Team picker */}
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

        {/* Product grid */}
        <section>
          {isLoading || items.length === 0 ? (
            <EmptyState message="هیچ محصولی برای این تیم یافت نشد." />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((p) => (
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
              renderItem={renderItem}
              showControls
              size="sm"
              showShadow
              radius="md"
              color="primary"
              page={page}
              total={pages}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
