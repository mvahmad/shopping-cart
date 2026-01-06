import { QueryClient, dehydrate } from "@tanstack/react-query";
import {Providers} from "@/app/providers";
import ProductsPageComponent from "../components/products/ProductsPage";
import { getProducts } from "../hooks/queryHooks/products";
import { getCategories } from "../hooks/queryHooks/getCategoris";
import { getSubcategoriesByCategoryId } from "../hooks/queryHooks/getSubCategoris";

const Page = async ({ searchParams }:{searchParams: Promise<Record<string, string>>}) => {
  const resolvedParams = await searchParams
  // Fetch initial products
  const products = await getProducts();

   const queryClient = new QueryClient();

  // Prefetch categories
  const categoriesData = await queryClient.fetchQuery({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });

  const defaultCategoryId =
    categoriesData?.data?.categories?.[0]?._id ?? "";

  // Prefetch subcategories by default category
  const subcategoriesData = defaultCategoryId
    ? await queryClient.fetchQuery({
        queryKey: ["GetSubcategories", defaultCategoryId],
        queryFn: () => getSubcategoriesByCategoryId(defaultCategoryId),
      })
    : null;

  const defaultSubcategoryId =
    subcategoriesData?.data?.subcategories?.[0]?._id ?? "";

  // Prefetch products
  await queryClient.prefetchQuery({
    queryKey: [
      "GetProducts",
      defaultCategoryId,
      defaultSubcategoryId,
      resolvedParams,
    ],
    queryFn: () =>
      getProducts({
        category: defaultCategoryId,
        subcategory: defaultSubcategoryId,
        ...resolvedParams,
      }),
  });

  return (
     <Providers dehydratedState={dehydrate(queryClient)}>
      <ProductsPageComponent
        initialProducts={products}
        searchParams={resolvedParams}
        initialCategoryId={defaultCategoryId}
        initialSubcategoryId={defaultSubcategoryId}
    />
     </Providers>
 
  );
};

export default Page;

