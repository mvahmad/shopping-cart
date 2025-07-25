"use server"
import { auth } from "@/auth"
// import SignInButton from "../admin/components/signInButton"
import Link from "next/link"
import SignOutButton from "../admin/components/signOutButtn"
import LoginForm from "../components/loginForm/page"
export default async function AdminLogin (){
    const session =await auth()
    if(session?.user){
        return(
            <>
             <Link href={"/admin"}>Admin Dashboard</Link>
             <SignOutButton />
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