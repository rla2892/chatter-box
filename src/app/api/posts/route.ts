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
    const sessionObj = await getServerSession(authOptions)
    const userId = sessionObj?.user?.id ?? ``
    if (!userId) {
        return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 })
    }

    const { title, content } = await request.json()

    // 기본적인 유효성 검사
    if (!title || !content) {
        return NextResponse.json({ message: "제목과 내용을 모두 입력해주세요." }, { status: 400 })
    }

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