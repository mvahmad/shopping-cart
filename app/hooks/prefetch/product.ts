import { QueryClient } from "@tanstack/react-query";
import { getProductById } from "@/app/products/import";
import { getProducts } from "@/app/hooks/queryHooks/products";

export const prefetchProductById = (
  queryClient: QueryClient,
  id: string
) => {
  return queryClient.prefetchQuery({
    queryKey: ["GetBookById", id],
    queryFn: () => getProductById(id),
  });
};

export const prefetchRelatedProducts = (
  queryClient: QueryClient,
  categoryId: string
) => {
  return queryClient.prefetchQuery({
    queryKey: ["GetFirstCategoryBooks", categoryId],
    queryFn: () =>
      getProducts({
        limit: "6",
        category: categoryId,
      }),
  });
};
