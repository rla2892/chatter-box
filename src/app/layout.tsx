import type { Metadata } from "next"
import "./globals.css"
import { TopNavBar } from "@/components/TopNavBar"

export const metadata: Metadata = {
    title: `Chatter Box`,
    description: `Social media platform for developers`,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

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
                    <TopNavBar />
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
