import type { Metadata } from "next"
import "./globals.css"
import { TopNavBar } from "@/components/TopNavBar"
import SessionWrapper from "@/components/SessionWrapper"

export const metadata: Metadata = {
    title: `Chatter Box`,
    description: `Social media platform for developers`,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body>
                <SessionWrapper>
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
                </SessionWrapper>
            </body>
        </html>
    )
}
