import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

const protectedRouts = ["/admin"]

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Exclude static files and API routes from middleware logic
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/favicon') ||
        pathname.startsWith('/api')
    ) {
        return NextResponse.next()
    }

    // const gitSession = await auth()
    const accessToken = Cookies.get("accessToken")

    // check protected route
    const isProtected = protectedRouts.some(protectedPath =>
    pathname.startsWith(protectedPath)
)



    if (!accessToken && isProtected ) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    
    return NextResponse.next()

}