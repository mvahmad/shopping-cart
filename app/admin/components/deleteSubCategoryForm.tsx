"use client";
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
import { getSubcategories } from "@/app/hooks/queryHooks/getSubCategoris";
import { getProductsBySubCategory } from "@/app/hooks/queryHooks/products";
import { DeleteSubCategory } from "@/app/hooks/queryHooks/subCategoris";
import { useDeleteServices } from "@/app/hooks/useDeleteService";
import { useGetServices } from "@/app/hooks/useGetServices";
import {
  CategoriesResponse,
  getProductsResponse,
  SubcategoriesResponse,
} from "@/app/types";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function DeleteSubCategoryForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [subCategoriesItem, setSubCategoriesItem] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // ✅ Fetch categories
  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });

  //  Fetch subcategories
  const { data: subCategoryData, refetch } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubCategoris"],
    queryFn: () => getSubcategories({ limit: 0 }),
  });

  //  Fetch products by subcategory (only if one is selected)
  const { data: productBySubId, isLoading: isProductLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetProductBySubCategoryId", selectedSubCategory],
      queryFn: () => getProductsBySubCategory(selectedSubCategory),
      enabled: !!selectedSubCategory, // prevents query from firing without ID
    });

  //  (always defined)
  const productBySubCategoryCount = productBySubId?.data?.products?.length ?? 0;

  //  Delete mutation
  const { mutate, isPending } = useDeleteServices({
    mutationKey: ["DeleteSubCategory"],
    mutationFn: DeleteSubCategory,
    invalidate: ["GetSubCategoris"],
    options: {
      onSuccess() {
        toast.success(`SubCategory deleted successfully`);
        refetch();
        onClose();
      },
      onError(error) {
        toast.error(error.message, { rtl: false });
      },
    },
  });

  //  Category options
  const categoriesItem =
    categoryData?.data.categories?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [];

  //  Handle selecting a category → filters subcategories
  const handleSubCategories = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    const filteredSubcategories = subCategoryData?.data.subcategories
      ?.filter((item) => item.category === categoryId)
      .map((item) => ({ label: item.name, value: item._id }));

    setSubCategoriesItem(filteredSubcategories || []);
    setSelectedSubCategory(""); // reset selection when category changes
  };

  //  Handle deleting subcategory
  const handleDeleteSubCategory = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSubCategory) {
      toast.warning("Please select a subcategory to delete.");
      return;
    }

    if (productBySubCategoryCount > 0) {
      toast.error("You cannot delete this subcategory while it contains products.");
      return;
    }

    mutate(selectedSubCategory);
  };

  return (
    <form
      onSubmit={handleDeleteSubCategory}
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
    >
      {/* Category Select */}
      <Select
        label="Category"
        size="sm"
        variant="bordered"
        className="max-w-xs"
        onChange={handleSubCategories}
      >
        {categoriesItem.map((item) => (
          <SelectItem key={item.value} value={item.value} className="font-yekan">
            {item.label}
          </SelectItem>
        ))}
      </Select>

      {/* Subcategory Select */}
      <Select
        label="Subcategory"
        size="sm"
        variant="bordered"
        className="max-w-xs"
        isDisabled={subCategoriesItem.length === 0}
        onChange={(e) => setSelectedSubCategory(e.target.value)}
      >
        {subCategoriesItem.map((item) => (
          <SelectItem key={item.value} value={item.value} className="font-yekan">
            {item.label}
          </SelectItem>
        ))}
      </Select>

      {/* Status Info */}
      {selectedSubCategory && !isProductLoading && (
        <p className="text-sm text-gray-600 mt-2">
          {productBySubCategoryCount > 0
            ? `${productBySubCategoryCount} محصول در این زیرمجموعه وجود دارد.`
            : " این زیرمجموعه خالی و آماده حذف است."}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-6 w-full">
        <Button
          className="text-base sm:text-lg w-full"
          variant="bordered"
          color="danger"
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          className="bg-green-500 text-white text-base sm:text-lg w-full"
          type="submit"
          isDisabled={productBySubCategoryCount > 0 || !selectedSubCategory}
          isLoading={isPending}
        >
          Delete
        </Button>
      </div>
    </form>
  );
}
