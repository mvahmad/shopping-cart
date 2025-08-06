import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


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
    const accessToken =(await cookies()).get("accessToken")

    // check protected route
    const isProtected = protectedRouts.some(protectedPath =>
    pathname.startsWith(protectedPath)
)



    if (!accessToken && isProtected ) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    
    if (pathname.includes('/login') && accessToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
  }
    
    return NextResponse.next()

}