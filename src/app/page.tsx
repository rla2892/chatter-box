import PostDashboard from "@/components/PostDashboard"
import Link from "next/link"

export default function Home() {

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">피드</h1>
                <Link href="/create-post" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">게시글 작성</Link>
            </div>
            <PostDashboard />
        </>
    )
}
