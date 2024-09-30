import { UserType } from "@/types"
import { NextResponse } from "next/server"
import { getUserById, updateUser } from "@/lib/db"
import { sessionHelper } from "@/lib/auth"

// update user
export async function PUT(
    request: Request
) {
    try {
        const { name, email, password }: UserType = await request.json()

        // 기존 데이터 가져오기
        const sessionObj = await sessionHelper()
        const id = sessionObj?.user?.id ?? ``

        if (!id) {
            return NextResponse.json(
                { message: `사용자 정보를 찾을 수 없습니다.` },
                { status: 404 }
            )
        }
        const existingUserInfo = await getUserById(id)
        if (!existingUserInfo) {
            return NextResponse.json(
                { message: `사용자 정보를 찾을 수 없습니다.` },
                { status: 404 }
            )
        }

        if (!name || !email) {
            return NextResponse.json(
                { message: `필수 필드가 누락되었습니다.` },
                { status: 400 }
            )
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

        // 업데이트된 User 정보 저장
        await updateUser(id, updatedUser)

        return NextResponse.json(
            { message: `PUT 요청을 처리했습니다.` },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: `요청을 처리하는 데 실패했습니다. ${error}` },
            { status: 500 }
        )
    }
}
