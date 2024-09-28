import Link from "next/link"

export async function TopNavBar() {
    // TODO: 세션 정보를 가져오는 로직을 작성합니다.
    const session = null

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
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        로그아웃
                    </button>
                </>
            ) : (
                <Link href="/auth/signin" className="hover:underline">
                    로그인
                </Link>
                // <button
                //     className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                // >
                //     로그인
                // </button>
            )}
        </nav>
    </>
}
