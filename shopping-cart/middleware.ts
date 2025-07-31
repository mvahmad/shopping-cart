import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/lib/actions/auth";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/actions/session";

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

    const gitSession = await auth()
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    

    // check protected route
    const isProtected = protectedRouts.some(protectedPath =>
    pathname.startsWith(protectedPath)
)

    console.log('protected', isProtected)

    if (!session?.userId && isProtected ) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    return NextResponse.next()

}