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
                  toast.error(axiosError.response.data.message);
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
    { name: "firstname", type: "text", placeHolder: " علی" ,label:"نام"},
    { name: "lastname", type: "text", placeHolder: "زکی پور",label:"نام خوانوادگی" },
    { name: "username", type: "text", placeHolder: "بتمن",label:"نام کاربری" },
    { name: "password", type: "password",  placeHolder: "******",label:"رمز عبور" },
    { name: "address", type: "text",  placeHolder: "بندر",label:"آدرس" },
    { name: "phoneNumber", type: "number", placeHolder: "09129994567",label:"تلفن همراه" },
  ] as const;
  
  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                    ساخت حساب جدید ✨
                </h1>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    لطفا اطلاعات خود را وارد کنید
                </p>
      <form
      onSubmit={handleSubmit(handleSubmitSignUp)}
      className="space-y-5"
    >
      {/*  */}
      {formInputs.map((input, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {input.label}
          </label>
        <Controller
        // 
          name={input.name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={input.placeHolder}
              className="[all:unset] text-slate-800 w-full rounded-xl border border-gray-200 px-3 py-2.5 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition shadow-sm"
              type={input.type}
              isInvalid={!!errors[input.name]}
              errorMessage={errors[input.name]?.message as string | undefined}
            />
          )}
        />
        </div>
      ))}
      <Button
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                       py-2.5 font-semibold shadow hover:scale-[1.02] hover:shadow-lg 
                       active:scale-95 transition-all duration-200"
        type="submit"
        isLoading={isPending}
        spinner={<Spinner color="default" size="sm" />}
      >
        {!isPending && "ثبت‌نام"}
      </Button>
         <p className="mt-6 text-sm text-gray-600 text-center">
                    قبلاً ثبت‌نام کرده‌اید؟{" "}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        وارد شوید
                    </Link>
        </p>
    </form>
    </div>
 
  );
}
//

