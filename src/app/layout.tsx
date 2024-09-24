import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"

export const metadata: Metadata = {
    title: `Chatter Box`,
    description: `Social media platform for developers`,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = false // TODO: 세션 정보를 가져오는 로직을 작성합니다.
    // const signIn = () => {
    //     console.log(`로그인 버튼이 클릭되었습니다.`)
    // }
    // const signOut = () => {
    //     console.log(`로그아웃 버튼이 클릭되었습니다.`)
    // }

    return (
        <html lang="en">
            <body>
                <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
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
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            >
                                로그인
                            </button>
                        )}
                    </nav>
                </header>
                {/* 메인 콘텐츠 */}
                <main className="flex-grow container mx-auto p-4">
                    {children}
                </main>

                {/* 푸터 */}
                <footer className="bg-gray-200 text-center p-4">
                    © {new Date().getFullYear()} Chatter-Box. All rights reserved.
                </footer>
            </body>
        </html>
    )
}
