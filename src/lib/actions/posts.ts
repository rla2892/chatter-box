"use server"

import { createPost } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import { sessionHelper } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { newPostSchema } from "@/lib/validation"

/**
 * 서버 액션: 게시글 생성
 * @param title - 게시글 제목
 * @param content - 게시글 내용
 * @returns 생성된 게시글 데이터
 * @throws 로그인되지 않았거나 유효성 검사 실패 시 오류 발생
 */
export const createPostAction = async (formData: FormData) => {
    const sessionObj = await sessionHelper()
    const userId = sessionObj?.user?.id

    if (!userId) {
        throw new Error("로그인이 필요합니다.")
    }

    const inputTitle = formData.get("title") as string
    const inputContent = formData.get("content") as string

    // 유효성 검사
    const validationResult = newPostSchema.safeParse({ title: inputTitle, content: inputContent })
    if (!validationResult.success) {
        throw new Error(validationResult.error.errors.map(error => error.message).join("\n"))
    }
    const { title, content } = validationResult.data

    const post = {
        id: uuidv4(),
        userId: userId,
        title,
        content,
        image: "",
        createdAt: new Date().toISOString(),
        likes: 0
    }

    try {
        const response = await createPost(post)
        revalidatePath("/") // 홈 페이지의 캐시 재검증
        return response
    } catch (error) {
        throw new Error(`게시글 생성에 실패했습니다. ${error}`)
    }
}