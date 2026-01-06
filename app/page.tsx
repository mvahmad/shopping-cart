import { QueryClient, dehydrate } from "@tanstack/react-query";
import {Providers} from "./providers";
import HomeClient from "@/app/components/HomeClient/homeClient";

import { getCategories } from "./hooks/queryHooks/getCategoris";
import { getProducts } from "./hooks/queryHooks/products";

export default async function Page() {
  const queryClient = new QueryClient();

  // Prefetch categories
  const categoriesData = await queryClient.fetchQuery({
    queryKey: ["GetCategoriesHomepage"],
    queryFn: getCategories,
  });

  const categories = categoriesData?.data?.categories ?? [];

  const firstCategoryId = categories?.[1]?._id;
  const secondCategoryId = categories?.[0]?._id;

  //Prefetch slider products
  if (firstCategoryId) {
    await queryClient.prefetchQuery({
      queryKey: ["GetFirstCategoryBooks", firstCategoryId],
      queryFn: () =>
        getProducts({
          limit: "6",
          category: firstCategoryId,
        }),
    });
  }

  if (secondCategoryId) {
    await queryClient.prefetchQuery({
      queryKey: ["GetSecondCategoryBooks", secondCategoryId],
      queryFn: () =>
        getProducts({
          limit: "6",
          category: secondCategoryId,
        }),
    });
  }

  return (
    <Providers dehydratedState={dehydrate(queryClient)}>
      <HomeClient />
    </Providers>
  );
}
