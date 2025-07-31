import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, "Please do not leave this field blank."),
  password: z
    .string()
    .min(8, "Password must be at least eight characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "The password must contain at least one letter and one number!"
    ),
});
export type FormData = z.infer<typeof schema>;
