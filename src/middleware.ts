import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(
    request: NextRequest
) {
    // Profile 페이지에서는 로그인이 필요함
    // if (location.pathname === `/profile`) {
    //     if (!session) {
    //         return {
    //             redirect: {
    //                 destination: `/`,
    //                 permanent: false,
    //             },
    //         }
    //     }
    // }
}

// Don't invoke Middleware on some paths
export const config = {
    matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`]
}