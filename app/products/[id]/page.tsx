import ProductPage from "@/app/components/product/productPage";
import { Metadata } from "next";
import { getProductById } from "../import";

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


const Page = () => {
  return <ProductPage />
} 

export default Page;