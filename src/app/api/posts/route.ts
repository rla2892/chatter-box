import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/db'

export async function GET(
    // request: Request, context: { params: Params }
) {
    const postList = await getAllPosts()
    // 최신 게시글이 위에 오도록 정렬
    const sortedPosts = postList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    // return sortedPosts
    return NextResponse.json(
        {
            posts: sortedPosts
        },
        { status: 200 }
    )
}