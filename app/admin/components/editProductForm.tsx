'use client'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spinner ,Textarea } from "@nextui-org/react";
import { EditProduct ,editProductSchema } from "./schema";
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
import { useGetServices } from "@/app/hooks/useGetServices";
import { CategoriesResponse, SubcategoriesResponse } from "@/app/types";
import { ChangeEvent } from "react";
import { getSubcategories } from "@/app/hooks/queryHooks/getSubCategoris";
import { useState ,useEffect } from "react";
import useAdminStore from "@/app/store/admin/useAdminStore"
import { usePatchServices } from "@/app/hooks/usePatchService";
import { patchProducts } from "@/app/hooks/queryHooks/products";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const EditorClient = dynamic(()=>import("../../components/textEditor/textEditor") , {"ssr":false})

interface props{
  onClose:() => void ,
  refetch?:()=>void
}
function EditProductForm({ onClose  }:props) {
    const [subCategoriesItem, setSubCategoriesItem] = useState<
      { label: string; value: string }[]
    >([]);
    //get selected item
     const getSelectedItem = useAdminStore((state)=>state.getSelectedItem)
    //get category   
    const { data: categoryData } = useGetServices<CategoriesResponse>({
      queryKey: ["GetCategories"],
      queryFn: getCategories,
    });
    //get subcategory
    const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
      queryKey: ["GetSubCategories"],
      queryFn:()=> getSubcategories({limit :0}),
    });
    //category item
    const categoriesItem =
    categoryData?.data.categories?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [];

    useEffect(()=>{
      const categoryId = getSelectedItem().items?.category._id || "";
      const selectedCategory = categoriesItem.find(
        (category) => category.value === categoryId)
        console.log("selectedCategory", selectedCategory);
      const subcategories = subCategoryData?.data.subcategories
      ?.filter((item)=>item.category === selectedCategory?.value )
      console.log("Subcategories", subcategories);
      const filterSubCategory = subcategories?.map((item) => ({ label: item.name, value: item._id })) 
        setSubCategoriesItem(filterSubCategory || []);
        console.log('filllter',filterSubCategory);
        
    },[getSelectedItem().id])
    
 

   const handleSubCategories = (e: ChangeEvent<HTMLSelectElement>) => {
      const categoryId = e.target.value;
      // console.log(categoryId);
      // console.log("categoryITEM",categoriesItem );
      const selectedCategory = categoriesItem.find(
        (category) => category.value === categoryId)
        console.log("selectedCategory", selectedCategory);
      const subcategories = subCategoryData?.data.subcategories
      ?.filter((item)=>item.category === selectedCategory?.value )
      console.log("Subcategories", subcategories);
      const filterSubCategory = subcategories?.map((item) => ({ label: item.name, value: item._id })) 
        setSubCategoriesItem(filterSubCategory || []);
      return categoryId
    };




   const {
        handleSubmit,
        formState: { errors },
        register,
        control,
        reset,
        // 
        watch,
        // setValue,
        // setError,
        // clearErrors,
      } = useForm<EditProduct>({resolver:zodResolver(editProductSchema),
        defaultValues: {
          name: getSelectedItem().name,
          brand: getSelectedItem().items?.brand,
          quantity:getSelectedItem().items?.quantity,
          price: getSelectedItem().items?.price,
          discount: getSelectedItem().items?.discount,
          description:getSelectedItem().items?.description,
          category: getSelectedItem().items?.category._id,
          subcategory:getSelectedItem().items?.subcategory._id,
        },
      })

      useEffect(() => {
            const categoryName = getSelectedItem().items?.category._id || "";
            handleSubCategories({ target: { value: categoryName } } as ChangeEvent<HTMLSelectElement>);
            }, [getSelectedItem, categoryData, subCategoryData]);

      const {mutate , isPending}  = usePatchServices({
        mutationKey:["patchProducts"],
        mutationFn:patchProducts,
        invalidate:["GetProducts"],
        options:{
          onSuccess:()=>{
            toast.success("The edit was successful.")
            reset();
            onClose();
          },
          onError:(error)=>{
            toast.error(error.message)
            console.log("error", error.message);
            
          }
        }
      })

      const handleSubmitProductForm: SubmitHandler<EditProduct> = (value:EditProduct) => {
        if(getSelectedItem()){
          mutate({data: value, id: getSelectedItem().id})
        }
      }

      console.log('category', watch("category"));
      
    return(
      <form 
      action='submit'
      onSubmit={handleSubmit(handleSubmitProductForm)}
      className="sm:w-80 mx-auto flex justify-center items-center flex-col gap-2 py-8"
      >
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
          defaultSelectedKeys={[watch("category")]}
          label="Category"
          size="sm"
          isInvalid={!!errors["category"]}
          errorMessage={`${errors["category"]?.message}`}
          variant="bordered"
          className="max-w-xs"
          value={watch("category")}
          // {...field}
          onChange={(e)=>{
            field.onChange(handleSubCategories(e))}}
        >
          {categoriesItem?.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              id={item.value}
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
          defaultSelectedKeys={[watch("subcategory")]}
          {...field}
          value={watch("subcategory")}
        >
          {subCategoriesItem?.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              // className="font-yekan"
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
        value={watch("quantity").toString()}
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
        value={watch("price").toString()}
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
        value={watch("discount").toString()}
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
              className="w-44 xs:w-64 sm:w-full"
              isInvalid={!!errors["thumbnail"]}
              errorMessage={`${errors["thumbnail"]?.message}`}
              variant="bordered"
              {...register("thumbnail")}
            />

{/*  */}
        </div>

          <div className="flex border-2 border-[#e0e0e0] rounded-md w-full flex-col justify-center items-center gap-1 py-1">
            <span className="text-[10px]">Image has been uploaded</span>
        <img 
         src={ `https://elite-sport-backend.vercel.app/images/products/thumbnails/${getSelectedItem().items?.thumbnail || ""}`}
         alt="product-thumbnail"
         className="rounded-md w-32" 
        />
          </div>
        
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
              className="w-44 xs:w-64 sm:w-full"
              isInvalid={!!errors["images"]}
              errorMessage={`${errors["images"]?.message}`}
              variant="bordered"
              {...register("images")}
              // 
            />
         {/*  */}
        </div>
        
          <div className="flex border-2 border-[#e0e0e0] rounded-md w-full flex-col justify-center items-center gap-1 py-1">
            <span className="text-[10px]"> image uploaded</span>
            <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {getSelectedItem().items?.images?.map((image) => {
              return (
                <img
                  key={image}
                  src={`http://${image}`}
                  alt="thumbnail-preview"
                  className="rounded-md w-20"
                />
              );
            })}
            </div>
          </div>
       
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
          //
          render={({ field }) =>(
              <EditorClient value={field.value} onChange={field.onChange} />
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
          isLoading={isPending}
          spinner={<Spinner color="default" size="sm" />}
          // 
        >
        {!isPending &&  "Patch"}
        </Button>
      </div>

      </form>
    )
 
}

export default EditProductForm;