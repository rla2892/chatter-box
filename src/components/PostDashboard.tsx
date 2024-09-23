import PostList from './PostList'
import { PostsResponse } from '../types'
import { BASE_URL } from '@/config'

export default async function PostDashboard() {
    try {
        const res = await fetch(`${BASE_URL}/api/posts`)
        if (!res.ok) {
            throw new Error(`게시글을 불러오는 데 실패했습니다.`)
        }
        const data: PostsResponse = await res.json()
        // 최신 게시글이 위에 오도록 정렬
        const sortedPosts = data.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        return <PostList posts={sortedPosts} />
    } catch (err: any) {
        return <p className="text-red-500">{err.message}</p>
    }
}
