"use server"
import { parseJwt } from "@/app/lib/actions/session";
// import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { JWTPayload } from "jose";
import { cookies } from "next/headers";
export default async function UserInfo(){
    const cookie = (await cookies()).get('accessToken')?.value

    // If there's no session cookie, redirect
    if (!cookie) {
        redirect('/login');
    }

    let accessToken: JWTPayload | undefined;
    try {
        accessToken = await parseJwt(cookie as string);
        
    } catch {
        // If parsing fails, redirect
        redirect('/login');
    }

    if (accessToken?.id) {
        return (
            <>
                <div>:user id</div>
                {accessToken.id}
            </>
        );
    } else {
        redirect('/login');
    }
   


}