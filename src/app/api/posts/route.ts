import { PostType } from '@/types'
import DB_API_URL from '../../../config'
import { NextResponse } from 'next/server'

export async function GET(
    // request: Request, context: { params: Params }
) {
    const res = await fetch(`${DB_API_URL}/posts`)
    if (!res.ok) {
        throw new Error(`게시글을 불러오는 데 실패했습니다.`)
    }
    const data: PostType[] = await res.json()
    // 최신 게시글이 위에 오도록 정렬
    const sortedPosts = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    // return sortedPosts
    return NextResponse.json(
        {
            posts: sortedPosts
        },
        { status: 200 }
    )
}