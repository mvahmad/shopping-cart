"use client"
import { useRouter } from "next/navigation";
import { Button, Input, Spinner } from "@nextui-org/react"
import Link from "next/link"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {schema , FormData} from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePostServices } from "@/app/hooks/usePostServices"
import { postLoginData } from "@/app/services/auth"
import { authResponse } from "@/app/types"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import Cookies from 'js-cookie';

interface ResponseMessage {
  status: string;
  message: string;
}

export default function LoginForm (){
  const router = useRouter()

  const {
    handleSubmit,
    formState:{errors},
    control,
    reset
  } = useForm<FormData>({resolver:zodResolver(schema)})

  const {mutate,isPending} = usePostServices({
    mutationFn:postLoginData,
    mutationKey:["Login"]
  })

  const handleSubmitLogin :SubmitHandler<FormData>=(value)=>{
     mutate(value, {
      onSuccess: async (response) => {
        const res = response as authResponse;
        Cookies.set("accessToken", res.token.accessToken);
        Cookies.set("refreshToken", res.token.refreshToken);
        Cookies.set("userInfo",JSON.stringify(res.data.user))
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.user.role === "ADMIN") {
          router.replace("/admin");
        } else {
         router.replace("/");;
        }
        toast.success(
          `${res.data.user.firstname} ${res.data.user.lastname}  خوش آمدید`
        );
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ResponseMessage>;
            if (axiosError.response) {
              // 
          toast.error(axiosError.response.data.message, {
            rtl: false,
          });
        } else {
      // 
          toast.error("An unexpected error occurred", {
            rtl: false,
          });
        }
      },
      onSettled: () => {
        reset();
      },
    });
  }
    return(
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                    خوش اومدی 👋
                </h1>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    لطفا وارد حساب کاربری خود شوید
                </p>
      <form onSubmit={handleSubmit(handleSubmitLogin)} className="space-y-5">
        <div className="flex flex-col gap-2">
          <Controller name="username" 
          control={control}
          render={({field})=>{
            return(<div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام کاربری
              </label>
               <Input {...field}
               className="[all:unset] text-slate-800 w-full rounded-xl border border-gray-200 px-3 py-2.5 
                         focus:outline-none  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition shadow-sm  "
              id="username"
              type="text"
              name="username"
              placeholder="Batman" 
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message as string | undefined}
              />
              </div>)
          }
          } />
        </div>

        
      <div className="flex flex-col gap-2">
        <Controller
         name="password"
         control={control}
          render={({field})=>{
          return(
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                    رمز عبور
              </label>
            <Input
            {...field}
            className="[all:unset] text-slate-800 w-full rounded-xl border border-gray-200 px-3 py-2.5 
                         focus:outline-none  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition shadow-sm"
            id="password"
            name="password"
            type="password"
            placeholder="******"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string | undefined}
        />
        </div>
          )
        }} />
      </div>

        <Button
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                       py-2.5 font-semibold shadow hover:scale-[1.02] hover:shadow-lg 
                       active:scale-95 transition-all duration-200"
          type="submit"
          isLoading={isPending}
          spinner={<Spinner color="default" size="sm" />}
        >
          {!isPending && "ورود"}
        </Button>

       <p className="mt-6 text-sm text-gray-600 text-center">
        حساب کاربری ندارید؟{" "}
        <Link className="text-blue-600 hover:underline font-medium" href='/signup'>ثبت‌نام کنید</Link></p>
    </form>
    </div>
        
    )
}






