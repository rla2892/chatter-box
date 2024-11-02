import { GetTokenParams, JWT, decode } from "next-auth/jwt"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export async function getTokenFromCookies<R extends boolean = false>(
    params: Omit<GetTokenParams<R>, "req"> & { cookies: ReadonlyRequestCookies }
): Promise<R extends true ? string : JWT | null> {
    const {
        cookies,
        secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://") ?? !!process.env.VERCEL,
        cookieName = secureCookie
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token",
        raw,
        decode: _decode = decode,
        secret = process.env.NEXTAUTH_SECRET,
    } = params

    const token = cookies.get(cookieName)?.value

    // @ts-expect-error
    if (!token) return null

    // @ts-expect-error
    if (raw) return token

    try {
        // @ts-expect-error
        return await _decode({ token, secret })
    } catch {
        // @ts-expect-error
        return null
    }
}

