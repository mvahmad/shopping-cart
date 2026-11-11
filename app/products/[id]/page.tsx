import ProductPage from "@/app/components/product/productPage";
import { Metadata } from "next";
import { getProductById } from "../import";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  // In Next.js 15 `params` is a Promise and must be awaited.
  const { id } = await params;

  try {
    const product = await getProductById(id);

    if (!product?.data?.product) {
      return {
        title: "محصول یافت نشد",
        description: "این محصول موجود نیست.",
      };
    }

    return {
      title: `${product.data.product.name} | Elite Sport`,
      description:
        product.data.product.description ?? "مشاهده جزئیات محصول",
      openGraph: {
        title: product.data.product.name,
        description: product.data.product.description,
        images: product.data.product.images?.length
          ? product.data.product.images
          : [],
        type: "website",
      },

    };
  } catch {
    return {
      title: "خطای بارگذاری محصول",
    };
  }
}



export default async function  Page ({ params }: { params: Params }) {
    const queryClient = new QueryClient();
    const { id } = await params

    // prefetchQuery never throws; on failure the client query retries/shows an error state.
    await queryClient.prefetchQuery({
    queryKey: ["GetBookById", id],
    queryFn: () => getProductById(id),
    });
  return (
  <HydrationBoundary state={dehydrate(queryClient)}>
     <ProductPage />
  </HydrationBoundary>
  )

}
