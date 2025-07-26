"use server"
import { decrypt } from "@/app/lib/actions/session";
import LoginForm from "../components/loginForm/page"
import AdminHome from "../admin/page"
import { JWTPayload } from "jose";
import { cookies } from "next/headers";
export default async function AdminLogin (){
    const cookie = (await cookies()).get('session')?.value
    const session :JWTPayload | undefined = await decrypt(cookie)
    
    if(session?.userId){
        return(
            <>
             <AdminHome />
            </>

        )
    }
    return(
        <section className="flex flex-col gap-3 
         items-center justify-center w-full h-screen bg-gray-100">
            <LoginForm />
        </section>
    )
}

// 