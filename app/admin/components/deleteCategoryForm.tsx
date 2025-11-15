"use client";
import { DeleteCategory } from "@/app/hooks/queryHooks/categoris";
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
import { getProductsByCategory } from "@/app/hooks/queryHooks/products";
import { useDeleteServices } from "@/app/hooks/useDeleteService";
import { useGetServices } from "@/app/hooks/useGetServices";
import {
  CategoriesResponse,
  getProductsResponse,
} from "@/app/types";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function DeleteCategoryForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("");

  //  Fetch categories
  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });



  //  Fetch products by category (only if one is selected)
  const { data: productByCatId, isLoading: isProductLoading } =
    useGetServices<getProductsResponse>({
      queryKey: ["GetProductByCategoryId", selectedCategory],
      queryFn: () => getProductsByCategory(selectedCategory),
      enabled: !!selectedCategory, // prevents query from firing without ID
    });

  //  (always defined)
  const productByCategoryCount = productByCatId?.data?.products?.length ?? 0;

  //  Delete mutation
  const { mutate, isPending } = useDeleteServices({
    mutationKey: ["DeleteCategory"],
    mutationFn:DeleteCategory,
    invalidate: ["GetCategoris"],
    options: {
      onSuccess() {
        toast.success('Category deleted successfully');
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

    console.log(categoryData?.data);
    

   const handleCategories = (e: ChangeEvent<HTMLSelectElement>)=>{
    const categoryId = e.target.value
    setSelectedCategory(categoryId)
   }


  //  Handle deleting category
  const handleDeleteCategory = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.warning("لطفا یک مجموعه برای حذف انتخاب کنید!");
      return;
    }

    if (productByCategoryCount > 0) {
      toast.error("تازمانی که مجموعه دارای محصول باشد نمی توانید آن را حذف کنید!");
      return;
    }

    mutate(selectedCategory);
  };

  return (
    <form
      onSubmit={handleDeleteCategory}
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
    >
      {/* Category Select */}
      <Select
        label="Category"
        size="sm"
        variant="bordered"
        className="max-w-xs"
        onChange={handleCategories}
      >
        {categoriesItem.map((item) => (
          <SelectItem key={item.value} value={item.value} className="font-yekan">
            {item.label}
          </SelectItem>
        ))}
      </Select>

      {/* Status Info */}
      {selectedCategory && !isProductLoading && (
        <p className="text-sm text-gray-600 mt-2">
          {productByCategoryCount > 0
            ? `${productByCategoryCount} محصول در این مجموعه وجود دارد.`
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
          isDisabled={productByCategoryCount > 0 || !selectedCategory}
          isLoading={isPending}
        >
          Delete
        </Button>
      </div>
    </form>
  );
}
