import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

const protectedRouts = ["/admin"]

export default async function middleware(request:NextRequest) {
    const session = await auth()
    const {pathname} = request.nextUrl 

    

    //check protected rout
    const isProtected  = protectedRouts.some((rout)=>
        pathname.startsWith(rout)
    )

    if( isProtected && !session){
        return NextResponse.redirect(new URL("/api/auth/signin",request.url))
    }

    return NextResponse.next()

}