"use server"
import { parseJwt } from "@/app/lib/actions/session";
import LoginForm from "../components/loginForm/page"
import AdminHome from "../admin/page"
// 
import { cookies } from "next/headers";
export default async function AdminLogin (){
    const cookie = (await cookies()).get('accessToken')?.value
    const accessToken  =  parseJwt(cookie as string)
    
    if(accessToken?.id){
        return(
            <>
             <AdminHome />
            </>

        )
    }
    return(
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
            <LoginForm />
        </section>
    )
}

// 