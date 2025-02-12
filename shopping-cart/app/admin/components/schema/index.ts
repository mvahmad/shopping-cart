import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1, "Please add category name"),
  icon: z.unknown().transform(value => {
    return value as FileList
  }),
});

export const addSubCategorySchema = z.object({
  name: z.string().min(1, "Please add subCategory name"),
  category: z.string().min(1, "Please add category name"),
})

export const addProductschema = z.object({
  name: z.string().min(1, "Please add Product Name"),
  category:  z.string().min(1, "Please add category name"),
  subcategory: z.string().min(1, "Please add subCategory name"),
  brand: z.string().min(1, "Please add brand name"),
  quantity: z.number({ message: " Please add qunantitiy" })
    .min(0, "Please add qunantitiy"),
  price: z
    .number({ message: "Please add price" })
    .min(0, "Please add price"),
  discount: z
    .number({ message: "Please add discount" })
    .min(0, "Please add discount"),
  thumbnail: z.any(),
  images: z.any(),
  description: z.string().min(1, "Please add discription"),
});

export type AddProductschema = z.infer<typeof addProductschema>;
export type AddCategorySchema = z.infer<typeof addCategorySchema>;
export type AddSubCategorySchema = z.infer<typeof addSubCategorySchema>
