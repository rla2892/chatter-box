import { UserType } from "@/types"
import { NextResponse } from "next/server"
import { getUserByEmail, registerUser } from "@/lib/db"

export async function POST(
    request: Request
) {
    try {
        const { id, name, email, password }: UserType = await request.json()

        // 기본적인 유효성 검사
        if (!id || !name || !email || !password) {
            return NextResponse.json(
                { message: `필수 필드가 누락되었습니다.` },
                { status: 400 }
            )
        }

        // 이미 등록된 이메일인지 확인
        const existingUser = await getUserByEmail(email)
        const isExistingUser = !!existingUser

        if (isExistingUser) {
            return NextResponse.json(
                { message: `이미 등록된 이메일입니다.` },
                { status: 400 }
            )
        }

        // 등록
        const newUser = {
            id,
            name,
            email,
            password,
        }
        try {
            const response = await registerUser(newUser)
            return NextResponse.json(
                response,
                { status: 201 }
            )
        } catch (error) {
            return NextResponse.json(
                { message: `사용자 생성에 실패했습니다. ${error}` },
                { status: 500 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            { message: `요청을 처리하는 데 실패했습니다. ${error}` },
            { status: 500 }
        )
    }
}