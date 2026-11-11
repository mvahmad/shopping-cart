"use client"
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import Footer from "../components/ui/footer";
import Heder from "../components/ui/header";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getStoredUser } from "../services/session";

export default function Page(){
    const router = useRouter();
    const { register, reset } = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            username: "",
            phoneNumber: "",
            address: "",
        },
    });

    // Browser storage isn't available during SSR; load the user after mount so
    // server and client markup match.
    useEffect(() => {
        const user = getStoredUser();
        if (user) {
            reset({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                username: user.username || "",
                phoneNumber: user.phoneNumber || "",
                address: user.address || "",
            });
        }
    }, [reset]);
    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userInfo")
        localStorage.removeItem("user")
        router.push("/"); // Client-side navigation
    };

    return(<>
    <Heder />
    <section className="flex justify-center items-center m-1">
            <form
                action=""
                className="flex flex-col items-center gap-3 mt-6 bg-white shadow-box
                px-4 tablet:px-12 py-8 rounded-lg border-2 w-[350px]"
            >
                <Input
                    size="sm"
                    isReadOnly
                    label="نام"
                    variant="underlined"
                    {...register("firstname")}
                />
                <Input
                    size="sm"
                    isReadOnly
                    label="نام خانوادگی"
                    variant="underlined"
                    {...register("lastname")}
                />
                <Input
                    size="sm"
                    isReadOnly
                    label="نام کاربری"
                    variant="underlined"
                    {...register("username")}
                />
                <Input
                    size="sm"
                    isReadOnly
                    label="شماره تماس"
                    variant="underlined"
                    {...register("phoneNumber")}
                />
                <Input
                    size="sm"
                    isReadOnly
                    label="آدرس"
                    variant="underlined"
                    {...register("address")}
                />
                <Button className="bg-blue-600 text-white" onPress={handleLogout}>خروج از حساب کاربری</Button>
                <Link href={"/"} className="pt-4 text-base">
                بازگشت به خانه
                </Link>
            </form>
    </section>
    <Footer /> 
    </>)
}