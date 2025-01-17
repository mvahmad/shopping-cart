import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1, "Please add category name"),
  icon: z.unknown().transform(value => {
    return value as FileList
  }),
});

export type AddCategorySchema = z.infer<typeof addCategorySchema>;
