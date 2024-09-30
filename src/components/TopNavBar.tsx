import Link from "next/link"
import { sessionHelper } from "@/lib/auth"
import LogoutButton from "@/components/LogoutButton"

export async function TopNavBar() {
    const session = await sessionHelper()

    return <>
        <Link href="/" className="text-2xl font-bold">
            Chatter-Box
        </Link>
        <nav className="flex items-center space-x-4">
            {session ? (
                <>
                    <Link href="/profile" className="hover:underline">
                        프로필
                    </Link>
                    <LogoutButton />
                </>
            ) : (
                <Link href="/auth/signin" className="hover:underline">
                    로그인
                </Link>
            )}
        </nav>
    </>
}
