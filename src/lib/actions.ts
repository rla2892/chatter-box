"use server"

import { createPost } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import { sessionHelper } from "@/lib/auth"
import { revalidatePath } from "next/cache"

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

    const title = formData.get("title") as string
    const content = formData.get("content") as string

    // 유효성 검사
    if (!title.trim() || !content.trim()) {
        throw new Error("제목과 내용을 모두 입력해주세요.")
    }

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