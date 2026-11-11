import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductsPageComponent from "../components/products/ProductsPage";
import { getProducts } from "../hooks/queryHooks/products";
import { getCategories } from "../hooks/queryHooks/getCategoris";
import { getSubcategoriesByCategoryId } from "../hooks/queryHooks/getSubCategoris";
import { CategoriesResponse, SubcategoriesResponse } from "../types";
import { productsQueryKey } from "../components/products/queryKeys";

const Page = async ({ searchParams }:{searchParams: Promise<Record<string, string>>}) => {
  const resolvedParams = await searchParams
  const queryClient = new QueryClient();

  // Prefetch categories (prefetchQuery never throws; the client retries on failure)
  await queryClient.prefetchQuery({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });
  const categoriesData = queryClient.getQueryData<CategoriesResponse>(["GetCategories"]);

  const defaultCategoryId =
    categoriesData?.data?.categories?.[0]?._id ?? "";

  // Prefetch subcategories by default category (same key the client uses)
  if (defaultCategoryId) {
    await queryClient.prefetchQuery({
      queryKey: ["GetSubCategories", defaultCategoryId],
      queryFn: () => getSubcategoriesByCategoryId(defaultCategoryId),
    });
  }
  const subcategoriesData = queryClient.getQueryData<SubcategoriesResponse>([
    "GetSubCategories",
    defaultCategoryId,
  ]);

  const defaultSubcategoryId =
    subcategoriesData?.data?.subcategories?.[0]?._id ?? "";

  const page = Number(resolvedParams.page) || 1;
  const limit = resolvedParams.limit || "5";

  // Prefetch products with exactly the key/params the client component queries.
  if (defaultCategoryId) {
    await queryClient.prefetchQuery({
      queryKey: productsQueryKey(page, limit, defaultCategoryId, defaultSubcategoryId),
      queryFn: () =>
        getProducts({
          page,
          limit,
          category: defaultCategoryId,
          subcategory: defaultSubcategoryId || undefined,
        }),
    });
  }

  return (
     <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPageComponent
        searchParams={resolvedParams}
        initialCategoryId={defaultCategoryId}
        initialSubcategoryId={defaultSubcategoryId}
    />
     </HydrationBoundary>

  );
};

export default Page;
