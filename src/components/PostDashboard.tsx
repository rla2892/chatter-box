import PostList from "./PostList"
import { getAllPosts } from "@/lib/db"

export default async function PostDashboard() {
    try {
        const posts = await getAllPosts()
        // 최신 게시글이 위에 오도록 정렬
        const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        return <PostList posts={sortedPosts} />
    } catch (err: any) {
        return <p className="text-red-500">{err.message}</p>
    }
}
