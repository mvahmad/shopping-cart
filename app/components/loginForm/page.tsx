"use client"
import { useRouter } from "next/navigation";
import { Button, Input, Spinner } from "@nextui-org/react"
import Link from "next/link"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { schema, FormData } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePostServices } from "@/app/hooks/usePostServices"
import { postLoginData } from "@/app/lib/actions/auth"
import { authResponse } from "@/app/types"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import Cookies from 'js-cookie';

interface ResponseMessage {
  status: string;
  message: string;
}

export default function LoginForm() {
  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const { mutate, isPending } = usePostServices({
    mutationFn: postLoginData,
    mutationKey: ["Login"]
  })

  const handleSubmitLogin: SubmitHandler<FormData> = (value) => {
    mutate(value, {
      onSuccess: async (response) => {
        const res = response as authResponse;
        Cookies.set("accessToken", res.token.accessToken);
        Cookies.set("refreshToken", res.token.refreshToken);
        Cookies.set("userInfo", JSON.stringify(res.data.user))
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.user.role === "ADMIN") {
          router.replace("/admin");
        } else {
          router.replace("/");;
        }
        toast.success(
          `${res.data.user.firstname} ${res.data.user.lastname} Welcome !`
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
  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)}
      className="flex w-auto md:w-[25rem] h-fit p-5 flex-col gap-2 border-1 rounded-md bg-white ">
      <h1 className="text-2xl font-bold ">Login</h1>
      <div className="flex flex-col gap-2">
        <Controller name="username"
          control={control}
          render={({ field }) => {
            return <Input {...field}
              id="username"
              name="username"
              placeholder="username"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message as string | undefined}
            />
          }
          } />
      </div>


      <div className="flex flex-col gap-2">
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            return (
              <Input
                {...field}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message as string | undefined}
              />
            )
          }} />
      </div>

      <Button
        className="bg-gray-500 text-white text-base sm:text-lg  xs:w-64 sm:w-full"
        type="submit"
        isLoading={isPending}
        spinner={<Spinner color="default" size="sm" />}
      >
        {!isPending && "Log In"}
      </Button>

      <p className="text-slate-400">Dont have an account?
        <Link className="text-slate-500 underline" href='/signup'>Sign in</Link></p>
    </form>

  )
}






