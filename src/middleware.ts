import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    console.log(`Request URL: ${request.url}`)
}

// Don't invoke Middleware on some paths
export const config = {
    matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`]
}