"use client"
import ProductsPageComponent from "../components/products/ProductsPage";
import { getCategories } from "../hooks/queryHooks/getCategoris";
import { useGetServices } from "../hooks/useGetServices";
import { CategoriesResponse } from "../types";


const Page = () => {
        //get categoris 
        const { data } = useGetServices<CategoriesResponse>({
            queryKey: ["GetCategories"],
            queryFn: getCategories,
        });
        const categories = data?.data.categories;
    


    return (
        <ProductsPageComponent 
categories={categories} />
    );
}

export default Page;

