"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import { RegisterFormData, schema } from "./schema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostServices } from "@/app/hooks/usePostServices";
import { postRegisterData } from "@/app/lib/actions/auth";
import { authResponse } from "@/app/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Cookies from 'js-cookie';
import Link from "next/link";
interface ResponseMessage {
  status: string;
  message: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const { mutate, isPending } = usePostServices({
    mutationFn: postRegisterData,
    mutationKey: ["Register"],
  });

  const handleSubmitSignUp: SubmitHandler<RegisterFormData> = (value) => {
    mutate(value, {
      onSuccess: async (response) => {
        const res = response as authResponse;
        Cookies.set("accessToken", res.token.accessToken);
        Cookies.set("refreshToken", res.token.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.replace("/");
        toast.success(`${res.data.user.firstname} ${res.data.user.lastname} Welcome`);
      },
      onError: (error) => {
           const axiosError = error as AxiosError<ResponseMessage>;
                  if (axiosError.response) {
                  console.log("Error response data:", axiosError.response.data);
                  toast.error(axiosError.response.data.message, {
                    rtl: false,
                  });
                } else {
                  console.error("Error:", axiosError);
                  toast.error("An unexpected error occurred", {
                    rtl: false,
                  });
                }
      },
      onSettled: () => {
        reset();
      },
    });
  };

  const formInputs = [
    { name: "firstname", type: "text", className: "", placeHolder: "First Name" },
    { name: "username", type: "text", className: "", placeHolder: "User Name" },
    { name: "lastname", type: "text", className: "", placeHolder: "Last Name" },
    { name: "password", type: "password", className: "", placeHolder: "Password" },
    { name: "address", type: "text", className: "", placeHolder: "Address" },
    { name: "phoneNumber", type: "number", className: "", placeHolder: "Phone Number" },
  ] as const;

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignUp)}
      className="flex w-[25rem] h-full my-2 p-5 flex-col gap-2 border-1 rounded-md bg-white "
    >
      <h1 className="text-2xl font-bold">Sign UP</h1>
      {formInputs.map((input, index) => (
        <Controller
          key={index}
          name={input.name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={input.placeHolder}
              className={input.className}
              type={input.type}
              isInvalid={!!errors[input.name]}
              errorMessage={errors[input.name]?.message as string | undefined}
            />
          )}
        />
      ))}
      <Button
        className="bg-gray-500 text-white text-base sm:text-lg w-44 xs:w-64 sm:w-full"
        type="submit"
        isLoading={isPending}
        spinner={<Spinner color="default" size="sm" />}
      >
        {!isPending && "Sign Up"}
      </Button>
      <p className="text-slate-400">Already have an account?<Link className="text-slate-500 underline" href='/login'>Login</Link></p>
    </form>
  );
}
//

