'use client'
import CategoryCard from "../components/ui/categoryCard";
import Footer from "../components/ui/footer";
import Header from "../components/ui/header";
import ProductsSlider from "../components/ui/ProductsSlider";
import { getCategories } from "../hooks/queryHooks/getCategoris";
import { getProducts } from "../hooks/queryHooks/products";
import { useGetServices } from "../hooks/useGetServices";
import { CategoriesResponse, getProductsResponse } from "../types";

const Page = () => {
     //get categoris 
    const { data } = useGetServices<CategoriesResponse>({
        queryKey: ["GetCategoriesHomepage"],
        queryFn: getCategories,
    });
    const categories = data?.data.categories;
    const { data: firstCategoryData, isLoading } =
        useGetServices<getProductsResponse>({
        queryKey: ["GetFirstCategoryBooks", categories],
        queryFn: () => getProducts({ limit: "6", category: categories?.[1]._id }),
        });

    const { data: secondCategoryData, isLoading: secondCategoryIsLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetSecondCategoryBooks", categories],
      queryFn: () => getProducts({ limit: "6", category: categories?.[0]._id }),
    });    

    const firstCategoryItems = firstCategoryData?.data?.products || [];
    const secondCategoryItems = secondCategoryData?.data?.products || [];
    return (
        <>
            <Header />
            <main className='[Elite-Sport-Home] w-full bg-white'>
                {/* --Banner's location-- */}
                <div className="max-w-7xl mx-auto h-52 bg-indigo-400 mt-8 rounded-lg" />
                    <CategoryCard />
                    <ProductsSlider 
                        bg={"bg-blue-700"}
                        title ={ "محبوب‌ترین‌ها"}
                        isLoading={secondCategoryIsLoading} 
                        products={secondCategoryItems} 
                        text={"white"}
                    />
                    <ProductsSlider 
                        bg={"bg-white"}
                        title ={ "پیشنهاد ویژه"}
                        isLoading={isLoading} 
                        products={firstCategoryItems} 
                        text={"slate-700"}
                     />
            </main>
            <Footer />

        </>
    );
}

export default Page;