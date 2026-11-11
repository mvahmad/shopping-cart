import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, "Please do not leave this field blank."),
  password: z
    .string()
    .min(8, "Password must be at least eight characters long")

    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number!"
    ),
  firstname: z.string().min(1, "Enter your name."),
  lastname: z.string().min(1, "Enter your last name"),
  address: z.string().min(1,"Enter your address"),
  phoneNumber: z
    .string()
    .min(1, "Enter your mobile number")
    .regex(
      // Anchored: the previous unanchored pattern accepted any string that merely
      // contained a phone number (e.g. "abc09129994567xyz" or 12 digits).
      /^((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}$/,
      "Mobile number is not valid"
    ),
});
export type RegisterFormData = z.infer<typeof schema>;