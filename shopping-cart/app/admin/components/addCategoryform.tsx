import { AddCategorySchema , addCategorySchema } from "./schema";
import {useForm , SubmitHandler } from 'react-hook-form' 
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@nextui-org/react";
import { PostCategory } from "@/app/hooks/queryHooks/categoris";
import { usePostServices } from "@/app/hooks/usePostServices";
import { CategoriesResponse } from "@/app/types";
const AddCategoryForm = ({ onClose }: { onClose: () => void }) => {
  const {
    handleSubmit,
    formState:{errors},
    register,
    reset
  } = useForm<AddCategorySchema>({resolver : zodResolver(addCategorySchema)})
  
  const {mutate , isPending} = usePostServices<{name:string ; icone?:FileList} , CategoriesResponse >(
    {
      mutationKey: ["PostCategories"],
      mutationFn: PostCategory,
      options: {
        onSuccess() {
          onClose();
          reset();
          // toast.success(`دسته بندی با موفقیت اضافه شد.`);
        },
        onError(error) {
          console.log((error.message, { rtl: false }));
         
        },
      },
    }
  )
  const handleSubmitAddCategoryForm:SubmitHandler<AddCategorySchema> =
  (values:AddCategorySchema)=>{
    mutate(values)
  }
  
    return ( 
        <form
        action=""
        className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
        onSubmit={handleSubmit(handleSubmitAddCategoryForm)}
      >
        <Input
          label={"Category Name"}
          size="sm"
          className="w-44 xs:w-64 sm:w-full"
          isInvalid={!!errors["name"]}
          errorMessage={`${errors["name"]?.message}`}
          variant="bordered"
          {...register("name")}
        />
        <Input
          label={"Icone(optional)"}
          size="sm"
          type="file"
          className="w-44 xs:w-64 sm:w-full"
          isInvalid={!!errors["icon"]}
          errorMessage={`${errors["icon"]?.message}`}
          variant="bordered"
          {...register("icon", { required: false })}
        />
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
            Cancele
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
    );
}
 
export default AddCategoryForm;