"use server"

import { registerUser, getUserByEmail } from "@/lib/db"
import { UserType } from "@/types"
import { v4 as uuidv4 } from "uuid"

/**
 * 서버 액션: 사용자 등록
 * @param formData - 폼 데이터
 * @returns 생성된 사용자 데이터
 * @throws 유효성 검사 실패 또는 사용자 생성 오류 시
 */
export const registerUserAction = async (formData: FormData) => {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // 유효성 검사
    if (!name || !email || !password) {
        throw new Error("필수 필드가 누락되었습니다.")
    }

    // 이미 등록된 이메일인지 확인
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        throw new Error("이미 등록된 이메일입니다.")
    }

    const newUser: UserType = {
        id: uuidv4(),
        name,
        email,
        password
    }

    try {
        const response = await registerUser(newUser)
        return response
    } catch (error: any) {
        throw new Error(`사용자 등록에 실패했습니다. ${error.message || error}`)
    }
}
