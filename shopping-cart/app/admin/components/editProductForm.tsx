import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spinner ,Textarea } from "@nextui-org/react";
import { EditProduct ,editProductSchema } from "./schema";
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
import { useGetServices } from "@/app/hooks/useGetServices";
import { CategoriesResponse, SubcategoriesResponse } from "@/app/types";
import { ChangeEvent, useRef } from "react";
import { getSubcategories } from "@/app/hooks/queryHooks/getSubCategoris";
import { useState } from "react";
interface props{
  onClose:() => void ,
  refetch?:()=>void
}
function EditProductForm({ onClose , refetch }:props) {
    const [subCategoriesItem, setSubCategoriesItem] = useState<
      { label: string; value: string }[]
    >([]);
    const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
     const fileInputThumbnailRef = useRef<HTMLInputElement>(null);
  
  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });

  const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubCategories"],
    queryFn:()=> getSubcategories({limit :0}),
  });


  const categoriesItem =
  categoryData?.data.categories?.map((category) => ({
    label: category.name,
    value: category._id,
  })) || [];

   const handleSubCategories = (e: ChangeEvent<HTMLSelectElement>) => {
      const categoryId = e.target.value;
      const filteredSubcategories = subCategoryData?.data.subcategories
        ?.filter((item) => item.category === categoryId)
        .map((item) => ({ label: item.name, value: item._id }));
      setSubCategoriesItem(filteredSubcategories || []);
      return categoryId;
    };



   const {
        handleSubmit,
        formState: { errors },
        register,
        control,
        reset,
        resetField,
        watch,
        setValue,
        setError,
        clearErrors,
      } = useForm<EditProduct>({resolver:zodResolver(editProductSchema),
        defaultValues: {
          name: "name",
          brand: "brand",
          quantity: 0,
          price: 1,
          discount: 1,
        },
      })

    return(
      <form 
      action='submit'
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8">
        <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={"Name"}
            size="sm"
            className="w-44 xs:w-64 sm:w-full"
            placeholder="Enter product name"
            variant="bordered"
          />
        )} /> 

        <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
          label="Category"
          size="sm"
          isInvalid={!!errors["category"]}
          errorMessage={`${errors["category"]?.message}`}
          variant="bordered"
          className="max-w-xs"
          {...field}  
          onChange={(e)=>field.onChange(handleSubCategories(e))}
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
        </Select>
        )} /> 

        <Controller
        name="subcategory"
        control={control}
        render={({ field }) => (
          <Select
          label="Subcategory"
          size="sm"
          isDisabled={subCategoriesItem.length === 0}
          isInvalid={!!errors["subcategory"]}
          errorMessage={`${errors["subcategory"]?.message}`}
          variant="bordered"
          className="max-w-xs"
          {...field}
          onChange={(e)=>field.onChange(e.target.value)}
        >
          {subCategoriesItem?.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="font-yekan"
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>
        )} />
        <Controller
        name="brand"
        control={control}
        render={({ field }) => (
            <Input
            label={"Brand"}
            size="sm"
            className="w-44 xs:w-64 sm:w-full"
            isInvalid={!!errors["brand"]}
            errorMessage={`${errors["brand"]?.message}`}
            variant="bordered"
            {...field}
          />
        )} />

<Controller
     name="quantity" 
     control={control}
     render={(field)=>{
      return(
        <Input
        label={"Quntity"}
        size="sm"
        type="number"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["quantity"]}
        errorMessage={`${errors["quantity"]?.message}`}
        variant="bordered"
        {...field}
        onChange={(value) =>
          field.field.onChange(value.target.valueAsNumber)}
      />
      )
     }}
    />

<Controller
     name="price"
     control={control} 
     render={(field)=>{
      return(
        <Input
        label={"Price"}
        size="sm"
        type="number"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["price"]}
        errorMessage={`${errors["price"]?.message}`}
        variant="bordered"
        {...field}
        onChange={(value) =>
          field.field.onChange(value.target.valueAsNumber)}
      />
      )
     }}
     />

<Controller 
     name="discount"
     control={control}
     render={(field)=>{
      return(
        <Input
        label={"Discount"}
        size="sm"
        type="number"
        className="w-44 xs:w-64 sm:w-full"
        isInvalid={!!errors["discount"]}
        errorMessage={`${errors["discount"]?.message}`}
        variant="bordered"
        {...field}
        onChange={(value) =>
          field.field.onChange(value.target.valueAsNumber)}
      />
      )
     }}
     />

<div className="flex flex-col w-full mb-4">
        <div className="w-44 xs:w-64 sm:w-full flex items-center relative h-12">
              <Input
              label={"Thumbnail"}
              size="sm"
              type="file"
              className="opacity-0 w-full h-full z-10"
              isInvalid={!!errors["thumbnail"]}
              errorMessage={`${errors["thumbnail"]?.message}`}
              variant="bordered"
              {...register("thumbnail", {
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedThumbnail(URL.createObjectURL(file));
                    setValue("thumbnail", file);
                  }
                },
              })}
              ref={fileInputThumbnailRef}
            />
         
          <Button
            variant="bordered"
            radius="sm"
            className="absolute top-3 left-0 w-full h-8 z-20"
            onPress={() => {
              fileInputThumbnailRef.current?.click();
            }}
          >
            Choice Thumbnail
          </Button>
        </div>
        {selectedThumbnail && (
          <div className="flex border-2 border-[#e0e0e0] rounded-md w-full flex-col justify-center items-center gap-1 py-1">
            <span className="text-[10px]">Image has been uploaded</span>
            <div className="relative">
              <button
                className="size-6 cursor-pointer text-[#f31260] absolute top-0 left-0"
                // onClick={handleDeleteThumbnail}
              >delete</button>
              <img
                src={selectedThumbnail}
                alt="thumbnail-preview"
                className="rounded-md w-32"
              />
            </div>
          </div>
        )}
        {errors.images?.message && (
          <p className="text-[#f31260] text-[12px]">
            {errors.images?.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col w-full mb-4">
        <div className="w-44 xs:w-64 sm:w-full flex items-center relative h-12">
              <Input
              label={"Thumbnail"}
              size="sm"
              type="file"
              className="opacity-0 w-full h-full z-10"
              isInvalid={!!errors["thumbnail"]}
              errorMessage={`${errors["thumbnail"]?.message}`}
              variant="bordered"
              {...register("thumbnail", {
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedThumbnail(URL.createObjectURL(file));
                    setValue("thumbnail", file);
                  }
                },
              })}
              ref={fileInputThumbnailRef}
            />
         
          <Button
            variant="bordered"
            radius="sm"
            className="absolute top-3 left-0 w-full h-8 z-20"
            onPress={() => {
              fileInputThumbnailRef.current?.click();
            }}
          >
            Choice Thumbnail
          </Button>
        </div>
        {selectedThumbnail && (
          <div className="flex border-2 border-[#e0e0e0] rounded-md w-full flex-col justify-center items-center gap-1 py-1">
            <span className="text-[10px]">Image has been uploaded</span>
            <div className="relative">
              <button
                className="size-6 cursor-pointer text-[#f31260] absolute top-0 left-0"
                // onClick={handleDeleteThumbnail}
              >delete</button>
              <img
                src={selectedThumbnail}
                alt="thumbnail-preview"
                className="rounded-md w-32"
              />
            </div>
          </div>
        )}
        {errors.images?.message && (
          <p className="text-[#f31260] text-[12px]">
            {errors.images?.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col w-full mb-4 -mt-6">
        <div className="w-44 xs:w-64 sm:w-full flex items-center relative h-12">
       
              <Input
              label={"Images"}
              size="sm"
              multiple
              id="imagesInp"
              type="file"
              className="opacity-0 w-full h-full z-10"
              isInvalid={!!errors["images"]}
              errorMessage={`${errors["images"]?.message}`}
              variant="bordered"
              {...register("images")}
              onChange={(e) => {
                register("images").onChange(e);
                // handleFileChange(e);
              }}
            />
          <Button
            variant="bordered"
            radius="sm"
            className="absolute top-3 left-0 w-full h-8 z-20"
            onPress={() => {
              const fileInput = document.querySelector(
                "#imagesInp"
              ) as HTMLInputElement;
              fileInput?.click();
            }}
          >
            Choice Images
          </Button>
        </div>
        {selectedImages.length > 0 && (
          <div className="flex border-2 border-[#e0e0e0] rounded-md w-full flex-col justify-center items-center gap-1 py-1">
            <span className="text-[10px]"> image uploaded</span>
            <div className="flex items-center justify-between gap-2 overflow-x-auto">
              {selectedImages.map((image, index) => (
                <div className="relative flex-shrink-0" key={index}>
                  <button
                    className="size-6 cursor-pointer text-[#f31260] absolute top-0 left-0"
                    // onClick={() => handleDeleteImages(image)}
                  >delete</button>
                  <img
                    src={image}
                    alt="image-preview"
                    className="rounded-md w-32"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {errors.images?.message && (
          <p className="text-[#f31260] text-[12px]">
            {errors.images?.message as string}
          </p>
        )}
      </div>
      <div className="w-full">
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field }) =>(
            <Textarea aria-label="add product" placeholder="discription" value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}
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
          Cancel
        </Button>
        <Button
          className="bg-green-400 text-white text-base sm:text-lg w-full"
          type="submit"
          // isLoading={isPending}
          spinner={<Spinner color="default" size="sm" />}
          // onPress={()=>
          //   handleSubmit(handleSubmitProductForm, () => {
          //     if (!errors.images?.message) {
          //       clearErrors("images");
          //       clearErrors("thumbnail");
          //     }
          //     if (!watch("images") || !watch("images").length) {
          //       setError("images", {
          //         type: "required",
          //         message: "choice file",
          //       });
          //       setError("thumbnail", {
          //         type: "required",
          //         message: "choice file",
          //       });
          //     }
          //   })
          // }
        >
          patch
        </Button>
      </div>

      </form>
    )
 
}

export default EditProductForm;