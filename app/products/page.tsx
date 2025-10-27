"use server"
import ProductsPageComponent from "../components/products/ProductsPage";



const Page = async ({ searchParams }:{searchParams: Promise<Record<string, string>>}) => {
       const resolvedParams = await searchParams;
    return (
        <ProductsPageComponent searchParams={resolvedParams} />
    );
}

export default Page;

