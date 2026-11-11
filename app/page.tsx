import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import HomeClient from "@/app/components/HomeClient/homeClient";

import { getCategories } from "./hooks/queryHooks/getCategoris";
import { getProducts } from "./hooks/queryHooks/products";
import { CategoriesResponse } from "./types";

// Re-generate the page periodically instead of freezing build-time data forever.
export const revalidate = 60;

export default async function Page() {
  const queryClient = new QueryClient();

  // Prefetch categories. prefetchQuery never throws, so a backend outage renders
  // the page (client queries retry) instead of crashing it / failing the build.
  await queryClient.prefetchQuery({
    queryKey: ["GetCategoriesHomepage"],
    queryFn: getCategories,
  });
  const categoriesData = queryClient.getQueryData<CategoriesResponse>(["GetCategoriesHomepage"]);

  const categories = categoriesData?.data?.categories ?? [];

  const firstCategoryId = categories?.[1]?._id;
  const secondCategoryId = categories?.[0]?._id;

  //Prefetch slider products
  await Promise.all([
    firstCategoryId &&
      queryClient.prefetchQuery({
        queryKey: ["GetFirstCategoryBooks", firstCategoryId],
        queryFn: () => getProducts({ limit: "6", category: firstCategoryId }),
      }),
    secondCategoryId &&
      queryClient.prefetchQuery({
        queryKey: ["GetSecondCategoryBooks", secondCategoryId],
        queryFn: () => getProducts({ limit: "6", category: secondCategoryId }),
      }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}
