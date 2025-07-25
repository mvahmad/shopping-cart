"use server";

import { z } from "zod";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";

interface user{
  id:string
  email:string
  password:string
}

const testUser:user = {
  id: "user-123",
  email: "contact@cosdensolutions.io",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export default async function Login(prevState: any, formData: any) {

  try {
     const result = loginSchema.safeParse(Object.fromEntries(formData));

     if (!result.success) {
        return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);
  redirect("/admin");

  } catch (error) {
    if ((error as any).digest?.startsWith("NEXT_REDIRECT")) {
    throw error; 
  }
    
  }
 
}

export async function logout() {
  await deleteSession();
  redirect("/");
}