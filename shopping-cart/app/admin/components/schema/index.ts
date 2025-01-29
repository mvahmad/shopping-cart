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

export type AddCategorySchema = z.infer<typeof addCategorySchema>;
export type AddSubCategorySchema = z.infer<typeof addSubCategorySchema>
