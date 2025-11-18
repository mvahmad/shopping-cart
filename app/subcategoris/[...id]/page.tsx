"use client";

import { renderItem } from "@/utils/paginationRenderItem";
import { useMemo, useState, useEffect } from "react";
import Header from "@/app/components/ui/header";
import Footer from "@/app/components/ui/footer";
import ProductCard from "@/app/components/ui/ProductCard";
import { Pagination } from "@nextui-org/react";
import { useParams, useSearchParams } from "next/navigation";
import { getProductsBySubCategory } from "@/app/hooks/queryHooks/products";
import { useGetServices } from "@/app/hooks/useGetServices";
import {
  getProductsResponse,
  ProductsEntity,
  SubcategoriesResponse,
} from "@/app/types";
import { useTableSort } from "@/app/hooks/useTabelSort";
import EmptyState from "@/app/components/ui/EmptyState";
import {getSubcategories} from "@/app/hooks/queryHooks/getSubCategoris";
import SkeletonCart from "@/app/components/ui/skeleton";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [selectedTeamId, setSelectedTeamId] = useState(id);

  const searchParams = useSearchParams();
  const { handlePageChange } = useTableSort();

  const limit = searchParams.get("limit") || "5";
  const page = Number(searchParams.get("page")) || 1;


  // Fetch subcategories
  const subcategoryQueryKey = [ "GetSubCategories",page,limit,selectedTeamId]
  const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
    queryKey: subcategoryQueryKey,
    queryFn: () => getSubcategories({limit:20}),
  });

  // Subcategory list
  const subItems = subCategoryData?.data.subcategories || [];
  useEffect(() => {
    if (subItems?.length) {
      setSelectedTeamId(selectedTeamId);
    }
  }, [subItems]);
  // Fetch products — refetch ANY time params change
  const { data, isLoading } = useGetServices<getProductsResponse>({
    queryKey: ["GetProducts",selectedTeamId],
    queryFn: () => getProductsBySubCategory(selectedTeamId),
  });

  console.log("RESPONSE:", data);

  // Product list
  const items: ProductsEntity[] = data?.data?.products || [];



  // Pagination
  const rowsPerPage = data?.per_page ?? 5;
  const pages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage]);

  return (
    <main dir="rtl" className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
        {/* Page header */}
                <header className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">محصولات</h1>
                    <p className="mt-1 text-sm text-slate-500">زیرمجموعه مورد نظر را انتخاب کنید تا محصولات مرتبط نمایش داده شوند.</p>
                </header>

        {/* Subcategory Picker */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2">
            {subItems.map((item) => {
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
          {isLoading ? (
           <div className="flex gap-1">
              <SkeletonCart />
              <SkeletonCart />
               <SkeletonCart />
            </div>
          ) : items.length === 0 ? (
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
              onChange={(page) => handlePageChange(page)}
            />
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
