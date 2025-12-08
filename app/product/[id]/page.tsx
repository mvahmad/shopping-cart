import ProductPage from "@/app/components/products/productPage";
import { Metadata } from "next";
import { getProductById } from "../import";

type MetadataProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const id = params.id;

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
      twitter: {
        card: "summary_large_image",
        title: product.data.product.name,
        description: product.data.product.description,
        images: product.data.product.images?.[0],
      },
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