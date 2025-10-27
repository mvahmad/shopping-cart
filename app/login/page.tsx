"use server"
import { parseJwt } from "@/app/lib/actions/session";
import LoginForm from "../components/loginForm/LoginForm"
import AdminHome from "../admin/page"
// 
import { cookies } from "next/headers";
export default async function AdminLogin({ searchParams }:{searchParams: Promise<Record<string, string>>}) {
    const cookie = (await cookies()).get('accessToken')?.value
    const accessToken = parseJwt(cookie as string);

    if (accessToken?.id) {
        return (
            <>
                <AdminHome  searchParams={searchParams} />
            </>

        )
    }
    return (
        <section className="flex flex-col gap-3 
         items-center justify-center w-full h-screen bg-gray-100">
            <LoginForm />
        </section>
    )
}

// 
