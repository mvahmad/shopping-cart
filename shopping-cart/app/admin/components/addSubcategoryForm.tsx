import { AddSubCategorySchema ,addSubCategorySchema } from "./schema";
import {useForm , SubmitHandler } from 'react-hook-form' 
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner ,Select, SelectItem, } from "@nextui-org/react";
import { usePostServices } from "@/app/hooks/usePostServices";
import PostSubCategory from "@/app/hooks/queryHooks/subCategoris";
import { CategoriesResponse } from "@/app/types";
import { useGetServices } from "@/app/hooks/useGetServices";
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
export default function AddSubcategoryForm ({ onClose }: { onClose: () => void }){
    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
      } = useForm<AddSubCategorySchema>({ resolver: zodResolver(addSubCategorySchema) });

      const { mutate, isPending } = usePostServices({
        mutationKey: ["PostSubcategories"],
        mutationFn: PostSubCategory,
        options: {
          onSuccess() {
            onClose();
            reset();
            // toast.success(`زیر مجموعه با موفقیت اضافه شد.`);
            console.log("successfully add subcategory");
            
          },
          onError(error) {
            // toast.error(error.message, { rtl: false });
            console.log(error);
          },
        },
      });

      const { data: categoryData } = useGetServices<CategoriesResponse>({
        queryKey: ["GetCategories"],
        queryFn: getCategories,
      });
    

    const handleSubmitSubcategoryForm: SubmitHandler<AddSubCategorySchema> = (
        values: AddSubCategorySchema
      ) => {
        mutate(values);
      };

    return ( 
    <>
         <form
      action=""
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
      onSubmit={handleSubmit(handleSubmitSubcategoryForm)}
    >
      <Input
        label={"subcategory name"}
        size="sm"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["name"]}
        errorMessage={`${errors["name"]?.message}`}
        variant="bordered"
        {...register("name")}
      />
      {/* <Select
        label="category"
        size="sm"
        isInvalid={!!errors["category"]}
        errorMessage={`${errors["category"]?.message}`}
        variant="bordered"
        className="max-w-xs"
        {...register("category")}
      >
        {categoriesItem?.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="font-yekan"
          >
            {item.label}
          </SelectItem>
        ))}
      </Select> */}

      <div className="flex gap-3 mt-6 w-full">
        <Button
          className="text-base sm:text-lg w-full"
          variant="bordered"
          color="danger"
          onPress={() => {
            reset();
            onClose();
          }}
        >
          Cansel
        </Button>
        <Button
          className="bg-green-400 text-white text-base sm:text-lg w-full"
          type="submit"
          isLoading={isPending}
          spinner={<Spinner color="default" size="sm" />}
        >
          {!isPending && "Add"}
        </Button>
      </div>
    </form>
    </> );
}
 
