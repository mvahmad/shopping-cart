import ProductPage from "@/app/components/product/productPage";
import { Metadata } from "next";
import { getProductById } from "../import";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import {Providers} from "@/app/providers";
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {

  const {id} =await params;

  try {
    const product = await getProductById(id);

    
    if (!product) {
      return {
        title: "محصول یافت نشد",
        description: "این محصول موجود نیست.",
      };
    }

    return {
      title: `${product.data.product.name} | Elite Sport`,
      description: product.description ?? "مشاهده جزئیات محصول",
      openGraph: {
        title: product.data.product.name,
        description: product.data.product.description,
        images: product.data.product.images?.length ? product.data.product.images : [],
        type: "website",
      },
      // 
    };
  } catch (err) {
    return {
      title: "خطای بارگذاری محصول",
    };
  }
}


export default async function  Page ({ params }: { params: { id: string } }) {
    const queryClient = new QueryClient();
    const { id } = await params
    
    await queryClient.prefetchQuery({
    queryKey: ["GetBookById", id],
    queryFn: () => getProductById(id),
    }); 
  return (
  <Providers dehydratedState={dehydrate(queryClient)}>
     <ProductPage />
  </Providers>
  )
 
} 

