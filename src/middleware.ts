import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(
    request: NextRequest
) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    const needAuthUrlsFroGet = [
        "/profile",
        "/create-post",
    ]

    if (needAuthUrlsFroGet.includes(request.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

    const needAuthUrlsForPost = [
        "/api/posts",
        "/api/users",
    ]

    if (needAuthUrlsForPost.includes(request.nextUrl.pathname)
        && request.method === "POST"
        && !token) {
        return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

    return NextResponse.next()
}

// Don't invoke Middleware on some paths
export const config = {
    matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`]
}