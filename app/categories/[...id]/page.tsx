"use client";
import { renderItem } from "@/utils/paginationRenderItem";
import { useMemo, useState } from "react";
import Header from "@/app/components/ui/header";
import Footer from "@/app/components/ui/footer";
import ProductCard from "@/app/components/ui/ProductCard";
import { Pagination } from "@nextui-org/react";
import { useParams, useSearchParams } from "next/navigation";
import { getProducts } from "@/app/hooks/queryHooks/products";
import { useGetServices } from "@/app/hooks/useGetServices";
import { CategoriesResponse, getProductsResponse, ProductsEntity } from "@/app/types";
import { useTableSort } from "@/app/hooks/useTabelSort";
import EmptyState from "@/app/components/ui/EmptyState";
//
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
import SkeletonCart from "@/app/components/ui/skeleton";



export default function Page() {
    // `[...id]` is a catch-all segment, so `id` is an array of segments.
    const params = useParams<{ id: string | string[] }>();
    const routeId = Array.isArray(params.id) ? params.id[0] : params.id;
    const[selectedLeagueId , setSelectedLeagueId ] = useState<string>(routeId ?? "");
    const searchParams = useSearchParams();
    const {handlePageChange } = useTableSort();

    const limit = searchParams.get("limit") || "5";
    const page = Number(searchParams.get("page")) || 1


    // Categories
    const { data: categoryData } = useGetServices<CategoriesResponse>({
        queryKey: ["GetCategories"],
        queryFn: getCategories,
    });
    const categories = categoryData?.data.categories;

    const selectLeague = (id: string) => {
      if (id === selectedLeagueId) return;
      setSelectedLeagueId(id);
      // Go back to the first page of the newly selected category.
      if (page !== 1) handlePageChange(1);
    };

    //get products (paginated)
    const {data ,isLoading} = useGetServices<getProductsResponse>({
      queryKey: ["GetProducts", "category", selectedLeagueId, page, limit],
      queryFn:()=>getProducts({ page, limit, category: selectedLeagueId }),
      enabled: !!selectedLeagueId,
    })

    //


    //product items
    let items: ProductsEntity[] = [];
    if (data?.data.products?.length) {
      items = data.data.products;
    }

    // Pagination calc
    const rowsPerPage = data?.per_page ? data?.per_page : 5;
    const pages = useMemo(()=>{
      return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
    },[data?.total,rowsPerPage])
   

    return (
        <main dir="rtl" className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
            <Header />
            <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
                {/* Page header */}
                <header className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">محصولات</h1>
                    <p className="mt-1 text-sm text-slate-500">مجموعه مورد نظر را انتخاب کنید تا محصولات مرتبط نمایش داده شوند.</p>
                </header>
                {/* League picker */}
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

                {/* Product grid */}
                     <section>
                        {isLoading ? (
                            <div className="flex gap-1">
                                <SkeletonCart />
                                <SkeletonCart />
                                <SkeletonCart />
                            </div>
                        ) : items.length === 0 ? (
                            <EmptyState message="هیچ محصولی یافت نشد." />
                        ) : (
                            <div className="flex flex-wrap justify-center sm:justify-start gap-4 md:gap-6">
                            {items.map((p) => (
                                <ProductCard key={p._id} p={p} />
                            ))}
                            </div>
                        )}
                     </section>
                {/* Pagination component*/}
                    {
                      pages > 0 ? (
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
                    ) : null
      }
            </div>          
            <Footer />
        </main>
    );
}
