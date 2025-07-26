"use server"
import { decrypt } from "@/app/lib/actions/session";
// import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { JWTPayload } from "jose";
import { cookies } from "next/headers";
export default async function UserInfo(){
    const cookie = (await cookies()).get('session')?.value
    const session :JWTPayload | undefined = await decrypt(cookie)

     if (session?.userId ){
         return(
        <>
        <div>:user id</div>
        {session?.userId} 
        </>
        


        
    )    
     }else{
        redirect('/login')
     }
   


}