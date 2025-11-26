'use client'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { EditProduct, editProductSchema } from "./schema";
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
import { useGetServices } from "@/app/hooks/useGetServices";
import { CategoriesResponse, SubcategoriesResponse } from "@/app/types";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import useAdminStore from "@/app/store/admin/useAdminStore"
import { usePatchServices } from "@/app/hooks/usePatchService";
import { patchProducts } from "@/app/hooks/queryHooks/products";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { getSubcategories } from "@/app/hooks/queryHooks/getSubCategoris";
const EditorClient = dynamic(() => import("../../components/textEditor/textEditor"), { ssr: false });

interface props {
  onClose: () => void,
  refetch?: () => void
}

function EditProductForm({ onClose }: props) {
  const getSelectedItem = useAdminStore((state) => state.getSelectedItem);

  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });

  const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubCategories"],
    queryFn: () => getSubcategories({ limit: 0 }),
  });

  const categoriesItem =
    categoryData?.data.categories?.map((category) => ({
      label: category.name,
      value: category._id,
    })) || [];

  const [subCategoriesItem, setSubCategoriesItem] = useState<{ label: string; value: string }[]>([]);

  const [selectedThumbnail, setSelectedThumbnail] = useState<string>(getSelectedItem().items?.thumbnail || "");
  const [selectedImages, setSelectedImages] = useState<string[]>(getSelectedItem().items?.images || []);

  const fileInputThumbnailRef = useRef<HTMLInputElement>(null);
  const fileInputImagesRef = useRef<HTMLInputElement>(null);

  const handleSubCategories = (categoryId: string) => {
  const selectedCategory = categoriesItem.find(
    (category) => category.value === categoryId
  );

  const subcategories = subCategoryData?.data.subcategories
    ?.filter((item) => item.category === selectedCategory?.value);

  const filterSubCategory = subcategories?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  setSubCategoriesItem(filterSubCategory || []);

  return categoryId;
};




  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    setValue,
  } = useForm<EditProduct>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: getSelectedItem().name,
      brand: getSelectedItem().items?.brand,
      quantity: getSelectedItem().items?.quantity,
      price: getSelectedItem().items?.price,
      discount: getSelectedItem().items?.discount,
      description: getSelectedItem().items?.description,
      category: getSelectedItem().items?.category._id,
      subcategory: getSelectedItem().items?.subcategory._id,
    }
  });

  useEffect(() => {
    handleSubCategories(getSelectedItem().items?.category._id || "");
  }, [getSelectedItem, categoryData, subCategoryData]);

  const { mutate, isPending } = usePatchServices({
    mutationKey: ["patchProducts"],
    mutationFn: patchProducts,
    invalidate: ["GetProducts"],
    options: {
      onSuccess: () => {
        toast.success("Edit successful!");
        reset();
        onClose();
      },
      onError: (error: any) => {
        toast.error(error.message);
      }
    }
  });

  // --- Upload helper for Cloudinary ---
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/cloudinary-test", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok && data.cloudinaryUrl) return data.cloudinaryUrl;
    throw new Error(data.message || "Cloudinary upload failed");
  };

  // const handleSubmitProductForm: SubmitHandler<EditProduct> = async (data) => {
  //   try {
  //     // Handle thumbnail
  //     let thumbnailUrl = selectedThumbnail;
  //     const thumbnailFile = watch("thumbnail") as unknown as File;
  //     if (thumbnailFile instanceof File) {
  //       thumbnailUrl = await uploadToCloudinary(thumbnailFile);
  //     }

  //     // Handle images
  //     const imagesFiles = watch("images") as unknown as File[];
  //     let imagesUrls = selectedImages;
  //     if (imagesFiles && imagesFiles.length > 0) {
  //       imagesUrls = [];
  //       for (const file of imagesFiles) {
  //         const url = await uploadToCloudinary(file);
  //         imagesUrls.push(url);
  //       }
  //     }

  //     const payload = {
  //       ...data,
  //       thumbnail: thumbnailUrl,
  //       images: imagesUrls
  //     };

  //     mutate({ id: getSelectedItem().id, data: payload });

  //   } catch (err: any) {
  //     toast.error(err.message);
  //   }
  // };
const handleSubmitProductForm: SubmitHandler<EditProduct> = async (data) => {
  try {
    // Upload thumbnail file if it's a File
  // Upload thumbnail
let thumbnailUrl = selectedThumbnail;
if (fileInputThumbnailRef.current?.files?.[0]) {
  const file = fileInputThumbnailRef.current.files[0];
  thumbnailUrl = await uploadToCloudinary(file); // returns real URL
}

// Upload images
let imagesUrls = selectedImages;
const imagesFiles = fileInputImagesRef.current?.files;
if (imagesFiles && imagesFiles.length > 0) {
  imagesUrls = [];
  for (const f of imagesFiles) {
    const url = await uploadToCloudinary(f);
    imagesUrls.push(url);
  }
}

// Send these URLs in PATCH
mutate({
  id: getSelectedItem().id,
  data: {
    ...data,
    thumbnail: thumbnailUrl,
    images: imagesUrls,
  },
});

  } catch (err: any) {
    toast.error(err.message);
  }
};


  return (
    <form className="sm:w-80 mx-auto flex flex-col gap-2 py-8"
      onSubmit={handleSubmit(handleSubmitProductForm)}>
      {/* Name */}
      <Controller
        name="name"
        control={control}
        render={({ field }) =>
          <Input {...field} label="Name" size="sm" className="w-44 xs:w-64 sm:w-full" variant="bordered" />
        }
      />

      {/* Category */}
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            value={watch("category")}
            label="Category"
            size="sm"
            variant="bordered"
            className="max-w-xs"
            onChange={(value) =>  {
                const categoryId = value as unknown as string
                field.onChange(handleSubCategories(categoryId))
              }}
          >
            {categoriesItem.map((item) => (
              <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
        )}
      />

      {/* Subcategory */}
      <Controller
        name="subcategory"
        control={control}
        render={({ field }) => (
          <Select
            value={watch("subcategory")}
            label="Subcategory"
            size="sm"
            variant="bordered"
            className="max-w-xs"
            isDisabled={subCategoriesItem.length === 0}
            onChange={(val) => field.onChange(val)}
          >
            {subCategoriesItem.map((item) => (
              <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
        )}
      />

      {/* Brand */}
      <Controller
        name="brand"
        control={control}
        render={({ field }) =>
          <Input {...field} label="Brand" size="sm" className="w-44 xs:w-64 sm:w-full" variant="bordered" />
        }
      />

      {/* Quantity, Price, Discount */}
      <Controller
        name="quantity"
        control={control}
        render={({ field }) =>
          <Input {...field} label="Quantity" type="number" size="sm" className="w-44 xs:w-64 sm:w-full" variant="bordered"
            value={field.value?.toString() ?? ""}
            onChange={(e) => field.onChange(e.target.valueAsNumber)}
          />
        }
      />
      <Controller
        name="price"
        control={control}
        render={({ field }) =>
          <Input 
          {...field} 
            label="Price"
            type="number"
            size="sm"
            className="w-44 xs:w-64 sm:w-full"
            variant="bordered"
            value={field.value?.toString() ?? ""}
            onChange={(e) => field.onChange(e.target.valueAsNumber)}
          />
        }
      />
      <Controller
        name="discount"
        control={control}
        render={({ field }) =>
          <Input {...field} label="Discount" type="number" size="sm" className="w-44 xs:w-64 sm:w-full" variant="bordered"
            value={field.value?.toString() ?? ""}
            onChange={(e) => field.onChange(e.target.valueAsNumber)}
          />
        }
      />

      {/* Thumbnail Upload */}
      <div className="flex flex-col w-full mb-4">
        <Input type="file" size="sm" {...register("thumbnail")} ref={fileInputThumbnailRef} onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setSelectedThumbnail(URL.createObjectURL(file));
        }} />
        {selectedThumbnail && <img src={selectedThumbnail} alt="thumbnail" className="rounded-md w-32 mt-2" />}
      </div>

      {/* Images Upload */}
      <div className="flex flex-col w-full mb-4">
        <Input type="file" multiple size="sm" {...register("images")} ref={fileInputImagesRef}
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;
            const previewUrls = Array.from(files).map(f => URL.createObjectURL(f));
            setSelectedImages(previewUrls);
          }} />
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {selectedImages.map((img, i) => <img key={i} src={img} className="rounded-md w-20" />)}
        </div>


        
      </div>

      {/* Description */}
      <Controller
        name="description"
        control={control}
        render={({ field }) =>
          <EditorClient value={field.value} onChange={field.onChange} />
        }
      />

      <div className="flex gap-3 mt-6 w-full">
        <Button variant="bordered" color="danger" onPress={() => { reset(); onClose(); }}>Cancel</Button>
        <Button type="submit" className="bg-green-400 text-white w-full" isLoading={isPending} spinner={<Spinner size="sm" />}>Patch</Button>
      </div>
    </form>
  )
}

export default EditProductForm;
