"use server"
import { auth } from "@/auth"
import SignInButton from "../admin/components/signInButton"
import Link from "next/link"
import SignOutButton from "../admin/components/signOutButtn"
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
        <section className="bg-gray-100">
            <div>you are not sign in</div>
            <SignInButton />
        </section>
    )
}

//