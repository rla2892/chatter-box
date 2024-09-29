import { NextResponse } from "next/server"
import { getAllPosts, createPost } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
    const postList = await getAllPosts()
    // 최신 게시글이 위에 오도록 정렬
    const sortedPosts = postList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return NextResponse.json(
        {
            posts: sortedPosts
        },
        { status: 200 }
    )
}

export async function POST(
    request: Request
) {
    // 기존 데이터 가져오기
    const sessionObj = await getServerSession(authOptions)
    const userId = sessionObj?.user?.id ?? ``

    const { title, content } = await request.json()
    const post = {
        id: uuidv4(),
        userId: userId,
        title: title as string,
        content: content as string,
        image: "",
        createdAt: new Date().toISOString(),
        likes: 0
    }

    try {
        const response = await createPost(post)
        return NextResponse.json(
            response,
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: `게시글 생성에 실패했습니다. ${error}` },
            { status: 500 }
        )
    }

}