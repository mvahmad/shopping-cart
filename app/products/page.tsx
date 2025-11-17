"use server";

import ProductsPageComponent from "../components/products/ProductsPage";
import { getProducts } from "../hooks/queryHooks/products";
import { getCategories } from "../hooks/queryHooks/getCategoris";
import { getSubcategoriesByCategoryId } from "../hooks/queryHooks/getSubCategoris";

const Page = async ({ searchParams }:{searchParams: Promise<Record<string, string>>}) => {
  const resolvedParams = await searchParams
  // Fetch initial products
  const products = await getProducts();

  // Fetch categories to determine default category/subcategory
  const categoriesData = await getCategories();
  const defaultCategoryId = categoriesData?.data.categories?.[0]?._id || "";

  const subcategoriesData = await getSubcategoriesByCategoryId(defaultCategoryId);
  const defaultSubcategoryId = subcategoriesData?.data.subcategories?.[0]?._id || "";

  return (
    <ProductsPageComponent
      initialProducts={products}
      searchParams={resolvedParams}
      initialCategoryId={defaultCategoryId}
      initialSubcategoryId={defaultSubcategoryId}
    />
  );
};

export default Page;

