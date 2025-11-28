"use client";

import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

import { AddProductschema, addProductschema } from "./schema";
import { useGetServices } from "@/app/hooks/useGetServices";
import { getCategories } from "@/app/hooks/queryHooks/getCategoris";
import { getSubcategories } from "@/app/hooks/queryHooks/getSubCategoris";
import { CategoriesResponse, SubcategoriesResponse } from "@/app/types";
import { usePostServices } from "@/app/hooks/usePostServices";
import { PostProduct } from "@/app/hooks/queryHooks/products";

const EditorClient = dynamic(() => import("../../components/textEditor/textEditor"), { ssr: false });

interface Props {
  onClose: () => void;
  refetch?: () => void;
}

export default function AddProductForm({ onClose, refetch }: Props) {
  // ----- RHF for form fields (non-file) -----
  const { control, handleSubmit, watch, reset, getValues } = useForm<AddProductschema>({
    resolver: zodResolver(addProductschema),
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
      quantity: 0,
      discount: 0,
      description: "",
      category: "",
      subcategory: "",
      thumbnail: "",
      images: [],
    },
  });

  // ----- Categories & subcats -----
  const { data: categoryData } = useGetServices<CategoriesResponse>({
    queryKey: ["GetCategories"],
    queryFn: getCategories,
  });
  const { data: subCategoryData } = useGetServices<SubcategoriesResponse>({
    queryKey: ["GetSubCategories"],
    queryFn: () => getSubcategories({ limit: 0 }),
  });

  const categoriesItem = categoryData?.data?.categories?.map((c) => ({ label: c.name, value: c._id })) || [];
  const [subCategoriesItem, setSubCategoriesItem] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const cat = watch("category");
    if (!cat) {
      setSubCategoriesItem([]);
      return;
    }
    const filtered = subCategoryData?.data?.subcategories?.filter((s) => s.category === cat) || [];
    setSubCategoriesItem(filtered.map((s) => ({ label: s.name, value: s._id })));
  }, [watch("category"), subCategoryData]);

  // ----- File refs + previews -----
  const thumbRef = useRef<HTMLInputElement | null>(null);
  const imagesRef = useRef<HTMLInputElement | null>(null);

  // local previews: can be blob:... while uploading, then replaced with cloud URL
  const [thumbPreview, setThumbPreview] = useState<string>(""); // local or cloud
  const [imagesPreview, setImagesPreview] = useState<string[]>([]); // mix of local and cloud

  // track uploaded cloud URLs (so we can send them in payload)
  const [thumbCloudUrl, setThumbCloudUrl] = useState<string>(""); // final cloud url
  const [imagesCloudUrls, setImagesCloudUrls] = useState<string[]>([]); // final cloud urls

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (thumbPreview?.startsWith("blob:")) URL.revokeObjectURL(thumbPreview);
      imagesPreview.forEach((u) => { if (u.startsWith("blob:")) URL.revokeObjectURL(u); });
    };
  }, [thumbPreview, imagesPreview]);

  // ----- Upload helper using your /api/cloudinary-test route -----
  async function uploadToCloudinaryViaApi(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch("/api/cloudinary-test", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Cloudinary upload failed");
    return json.cloudinaryUrl;
  }

  // ----- thumbnail handler (local preview -> upload -> cloud preview) -----
  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // local preview immediately
    const local = URL.createObjectURL(file);
    setThumbPreview(local);
    setThumbCloudUrl(""); // clear previous cloud url while uploading

    try {
      // upload via your API route
      const cloudUrl = await uploadToCloudinaryViaApi(file);
      // set RHF value (if you want to store the cloud url in RHF; optional)
      // NOTE: we don't use setValue here because we send payload manually below
      setThumbCloudUrl(cloudUrl);
      setThumbPreview(cloudUrl); // replace preview with cloud URL
      console.debug("Thumbnail uploaded ->", cloudUrl);
    } catch (err: any) {
      console.error("Thumbnail upload failed", err);
      toast.error(err.message || "Thumbnail upload failed");
      // keep local preview so user can retry if needed
    }
  };

  // ----- gallery images handler (local previews -> upload -> cloud previews) -----
  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // local previews immediately
    const localPreviews = files.map((f) => URL.createObjectURL(f));
    setImagesPreview(localPreviews);
    setImagesCloudUrls([]); // clear while uploading

    try {
      // upload all files in parallel (or sequentially if you want)
      const uploads = await Promise.all(files.map((f) => uploadToCloudinaryViaApi(f)));
      setImagesCloudUrls(uploads);
      setImagesPreview(uploads); // show cloud images
      console.debug("Images uploaded ->", uploads);
    } catch (err: any) {
      console.error("Images upload failed", err);
      toast.error(err.message || "Images upload failed");
      // keep local previews
    }
  };

  // ----- Post mutation (sends cloud URLs or empty defaults) -----
  const { mutate, isPending } = usePostServices({
    mutationKey: ["postProducts"],
    mutationFn: PostProduct,
    invalidate: ["GetProducts"],
    options: {
      onSuccess() {
        toast.success("Product added!");
        reset();
        setThumbPreview("");
        setImagesPreview([]);
        setThumbCloudUrl("");
        setImagesCloudUrls([]);
        onClose();
        refetch?.();
      },
      onError(err: any) {
        toast.error(err.message);
      },
    },
  });

  // ----- final submit: ensure we send cloud URLs (upload finished) -----
  const onSubmit: SubmitHandler<AddProductschema> = async (formValues) => {
    try {
      if (!thumbCloudUrl && thumbRef.current?.files?.[0]) {
        const f = thumbRef.current.files[0];
        const u = await uploadToCloudinaryViaApi(f);
        setThumbCloudUrl(u);
        setThumbPreview(u);
      }

      if ((!imagesCloudUrls || !imagesCloudUrls.length) && imagesRef.current?.files?.length) {
        const files = Array.from(imagesRef.current.files);
        const uploads = [];
        for (const f of files) {
          uploads.push(await uploadToCloudinaryViaApi(f));
        }
        setImagesCloudUrls(uploads);
        setImagesPreview(uploads);
      }

      // final payload uses cloud urls if available, otherwise placeholder fallback on backend
      const payload = {
        ...formValues,
        thumbnail: thumbCloudUrl || "", // backend will use placeholder if empty
        images: imagesCloudUrls && imagesCloudUrls.length ? imagesCloudUrls : [],
      };

      console.log("Final payload:", payload);
      mutate(payload);
    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err.message || "Submit failed");
    }
  };

  return (
    <form className="sm:w-80 mx-auto flex flex-col gap-2 py-8" onSubmit={handleSubmit(onSubmit)}>
      {/* NAME */}
      <Controller name="name" control={control} render={({ field }) => <Input {...field} label="Name" size="sm" variant="bordered" />} />

      {/* CATEGORY */}
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            label="Category"
            size="sm"
            variant="bordered"
            selectedKeys={new Set([field.value])}
            onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
          >
            {categoriesItem.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      {/* SUBCATEGORY */}
      <Controller
        name="subcategory"
        control={control}
        render={({ field }) => (
          <Select
            label="Subcategory"
            size="sm"
            variant="bordered"
            isDisabled={!subCategoriesItem.length}
            selectedKeys={new Set([field.value])}
            onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
          >
            {subCategoriesItem.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      {/* BRAND */}
      <Controller name="brand" control={control} render={({ field }) => <Input {...field} label="Brand" size="sm" variant="bordered" />} />

      {/* PRICE */}
      <Controller name="price" control={control} render={({ field }) => <Input {...field} type="number" label="Price" size="sm" variant="bordered" value={String(field.value)} onChange={(e) => field.onChange(e.target.valueAsNumber)} />} />

      {/* QUANTITY */}
      <Controller name="quantity" control={control} render={({ field }) => <Input {...field} type="number" label="Quantity" size="sm" variant="bordered" value={String(field.value)} onChange={(e) => field.onChange(e.target.valueAsNumber)} />} />

      {/* DISCOUNT */}
      <Controller name="discount" control={control} render={({ field }) => <Input {...field} type="number" label="Discount" size="sm" variant="bordered" value={String(field.value)} onChange={(e) => field.onChange(e.target.valueAsNumber)} />} />

      {/* THUMBNAIL (native input, preview + upload via API) */}
      <div className="flex flex-col w-full mb-4">
        <input ref={thumbRef} type="file" accept="image/*" onChange={handleThumbnailChange} className="border p-2 rounded" />
        <small className="text-xs text-gray-500">Thumbnail (local preview then cloud)</small>
        <div className="mt-2">
          <img src={thumbPreview || "https://placehold.co/400x400?text=No+Image"} alt="thumbnail-preview" className="rounded-md w-32" />
        </div>

      </div>

      {/* IMAGES (native input, preview + upload via API) */}
      <div className="flex flex-col w-full mb-4">
        <input ref={imagesRef} type="file" accept="image/*" multiple onChange={handleImagesChange} className="border p-2 rounded" />
        <small className="text-xs text-gray-500">Gallery (local preview then cloud)</small>
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {imagesPreview && imagesPreview.length ? (
            imagesPreview.map((u, i) => <img key={i} src={u} className="rounded-md w-20" alt={`preview-${i}`} />)
          ) : (
            <img src="https://placehold.co/400x400?text=No+Image" className="rounded-md w-20" alt="placeholder" />
          )}
        </div>

      </div>

      {/* DESCRIPTION (editor) */}
      <Controller name="description" control={control} render={({ field }) => <EditorClient value={field.value} onChange={field.onChange} />} />


      <div className="flex gap-3 mt-6 w-full">
        <Button variant="bordered" color="danger" onPress={() => { reset(); setThumbPreview(""); setImagesPreview([]); onClose(); }}>
          Cancel
        </Button>

        <Button type="submit" className="bg-green-400 text-white w-full" isLoading={isPending} spinner={<Spinner size="sm" />}>
          Add
        </Button>
      </div>
    </form>
  );
}
