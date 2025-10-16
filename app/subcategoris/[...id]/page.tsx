"use client";
import { renderItem } from "@/utils/paginationRenderItem";
import { useMemo, useState } from "react";
import Header from "@/app/components/ui/header";
import Footer from "@/app/components/ui/footer";
import ProductCard from "@/app/components/ui//ProductCard";
import { Pagination } from "@nextui-org/react";
import { useParams, useSearchParams } from "next/navigation";
import { getProducts } from "@/app/hooks/queryHooks/products";
import { useGetServices } from "@/app/hooks/useGetServices";
import { getProductsResponse, ProductsEntity, SubcategoriesResponse } from "@/app/types";
import { useTableSort } from "@/app/hooks/useTabelSort";
import EmptyState from "@/app/components/ui/EmptyState";
import { getSubcategoriesBySubCategoryId} from "@/app/hooks/queryHooks/getSubCategoris";



export default function Page() {
    const {id} = useParams<{ id: string }>();
    const[subId] = useState(id);
    // const[selectedTeamId , setSelectedTeamId] = useState("")
    const searchParams = useSearchParams();
    const {handlePageChange } = useTableSort();
    
    const limit = searchParams.get("limit") || "5";
    const params: {
      page: number;
      limit: string;
      category?: string ;
      subcategory?: string;
    } = {
      page: Number(searchParams.get("page")) || 1,
      limit,
      subcategory:subId,
      
    };

    //get subCategoris
    const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
      queryKey: ["GetSubCategories",subId],
      queryFn:()=> getSubcategoriesBySubCategoryId(subId),
    });

    //get products
    const {data ,isLoading} = useGetServices<getProductsResponse>({
      queryKey:["GetProducts",params] ,
      queryFn:()=>getProducts(params)
    })

    //subcategory items
    let subItems = subCategoryData?.data.subcategories


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
                </header>
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
                                page={Number(searchParams.get("page")) || 1}
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
