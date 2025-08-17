// 
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken");
    const cookie = request.cookies.get("userInfo")?.value;

    let role: string | undefined;
    if (cookie) {
        try {
            role = JSON.parse(cookie).role;
        } catch {
            role = undefined;
        }
    }

    // Exclude static files and API routes from middleware logic
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/favicon') ||
        pathname.startsWith('/api')
    ) {
        return NextResponse.next();
    }

    // Check if route is protected
    const isProtected = protectedRoutes.some(protectedPath =>
        pathname.startsWith(protectedPath)
    );

    // Redirect unauthenticated users from protected route to login
    if (!accessToken && isProtected) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    if (accessToken &&  role !== "ADMIN" && pathname.startsWith('/login')){
         return NextResponse.redirect(new URL("/", request.nextUrl))
    }

    // Redirect non-admin users from /admin to home
    if (
        accessToken &&
        role !== "ADMIN" &&
        pathname.startsWith("/admin")
    ) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // Redirect admin from login/root to /admin
    const isRootOrLogin =
        pathname === "/" ||
        pathname.replace(/\/$/, "") === "/login";

    if (
        accessToken &&
        role === "ADMIN" &&
        isRootOrLogin
    ) {
        return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }

    return NextResponse.next();
} 