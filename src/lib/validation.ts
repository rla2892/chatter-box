import { z } from "zod"

// 사용자 정보 스키마
export const newUserSchema = z.object({
    name: z.string().min(1, "이름은 필수입니다."),
    email: z.string().email("유효한 이메일 주소를 입력하세요."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
})

export const updateUserSchema = z.object({
    name: z.string().min(1, "이름은 필수입니다."),
    email: z.string().email("유효한 이메일 주소를 입력하세요."),
    // 비밀번호는 선택적으로 입력할 수 있음
    password: z.string().optional(),
})

