"use server"
import { parseJwt } from "@/app/lib/actions/auth-server";
// import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { JWTPayload } from "jose";
import { cookies } from "next/headers";

interface MyJWTPayload extends JWTPayload {
  id: string;
}

export default async function UserInfo(){
    const cookie = (await cookies()).get('accessToken')?.value

    // If there's no session cookie, redirect
    if (!cookie) {
        redirect('/login');
    }

    let accessToken: MyJWTPayload | undefined;
    try {
        accessToken = await parseJwt(cookie as string);
        
    } catch {
        // If parsing fails, redirect
        redirect('/login');
    }

    if (accessToken?.id) {
        return (
            <div>
                <div>:user id</div>
                {accessToken.id}
            </div>
        );
    } else {
        redirect('/login');
    }
   


}