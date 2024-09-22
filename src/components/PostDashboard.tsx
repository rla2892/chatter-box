"use client"

import { useEffect, useState } from 'react'
import PostList from './PostList'
import { PostType, PostsResponse } from '../types'
// import Post from './Post'
// import { PostType } from '../types'

export default function PostDashboard() {
    const [posts, setPosts] = useState<PostType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPosts = async () => {
        try {
            const res = await fetch(`/api/posts`)
            if (!res.ok) {
                throw new Error(`게시글을 불러오는 데 실패했습니다.`)
            }
            const data: PostsResponse = await res.json()
            // 최신 게시글이 위에 오도록 정렬
            const sortedPosts = data.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            setPosts(sortedPosts)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return <>
        {loading && <p>로딩 중...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <PostList posts={posts} />}
    </>
}

// const PostList: React.FC<PostListProps> = ({ posts }) => {
//     return (
//         <div>
//             {posts.map((post: PostType) => (
//                 <Post
//                     key={post.id}
//                     id={post.id}
//                     userId={post.userId}
//                     title={post.title}
//                     content={post.content}
//                     image={post.image}
//                     createdAt={post.createdAt}
//                     likes={post.likes}
//                 />
//             ))}
//         </div>
//     )
// }

// export default PostList
