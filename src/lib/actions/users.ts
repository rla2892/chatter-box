"use server"

import { registerUser, getUserByEmail, getUserById, updateUser } from "@/lib/db"
import { UserType } from "@/types"
import { v4 as uuidv4 } from "uuid"
import { sessionHelper } from "@/lib/auth"
import { newUserSchema, updateUserSchema } from "@/lib/validation"

/**
 * 서버 액션: 사용자 등록
 * @param formData - 폼 데이터
 * @returns 생성된 사용자 데이터
 * @throws 유효성 검사 실패 또는 사용자 생성 오류 시
 */
export const registerUserAction = async (formData: FormData) => {
    const inputName = formData.get("name") as string
    const inputEmail = formData.get("email") as string
    const inputPassword = formData.get("password") as string

    // 유효성 검사
    const validationResult = newUserSchema.safeParse({ name: inputName, email: inputEmail, password: inputPassword })
    if (!validationResult.success) {
        throw new Error(validationResult.error.errors.map(error => error.message).join("\n"))
    }
    const { name, email, password } = validationResult.data

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

/**
 * 서버 액션: 사용자 정보 업데이트
 * @param formData - 폼 데이터
 * @returns 업데이트된 사용자 데이터
 * @throws 유효성 검사 실패 또는 사용자 업데이트 오류 시
 */
export const updateUserAction = async (formData: FormData) => {
    const inputName = formData.get("name") as string
    const inputEmail = formData.get("email") as string
    const inputPassword = formData.get("password") as string

    // 유효성 검사
    const validationResult = updateUserSchema.safeParse({ name: inputName, email: inputEmail, password: inputPassword })
    if (!validationResult.success) {
        throw new Error(validationResult.error.errors.map(error => error.message).join("\n"))
    }
    const { name, email, password } = validationResult.data

    // 세션에서 사용자 ID 가져오기
    const sessionObj = await sessionHelper()
    const id = sessionObj?.user?.id ?? ``

    if (!id) {
        throw new Error("사용자 정보를 찾을 수 없습니다.")
    }

    // 기존 사용자 정보 가져오기
    const existingUserInfo = await getUserById(id)
    if (!existingUserInfo) {
        throw new Error("사용자 정보를 찾을 수 없습니다.")
    }

    // 기존 User 와 새 User 정보를 병합
    const updatedUser: UserType = {
        ...existingUserInfo,
        name,
        email,
    }

    // 비밀번호 변경 시
    if (password) {
        updatedUser.password = password
    }

    try {
        // 업데이트된 User 정보 저장
        await updateUser(id, updatedUser)
        return updatedUser
    } catch (error: any) {
        throw new Error(`사용자 정보 업데이트에 실패했습니다. ${error.message || error}`)
    }
}
