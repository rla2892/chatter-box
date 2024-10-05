"use client"

import { useState } from "react"
import bcrypt from "bcryptjs"
import { UserType } from "@/types"
import { updateUserAction } from "@/lib/actions/users"

export default function ProfileForm(
    {
        userInfo,
    }: {
        userInfo: UserType
    }
) {
    const [name, setName] = useState<string>(userInfo.name || ``)
    const [email, setEmail] = useState<string>(userInfo.email || ``)
    const [password, setPassword] = useState<string>(``)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const handleUpdate = async (formData: FormData) => {
        setSubmitting(true)
        setError(null)
        setMessage(null)

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            formData.set("password", hashedPassword)
        }

        try {
            await updateUserAction(formData)
            setMessage(`프로필이 성공적으로 업데이트되었습니다.`)
            if (password) {
                // 비밀번호 변경 시 로그아웃 처리 필요할 수 있음
                // 예시: window.location.href = "/auth/signin";
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (<>
        <form action={handleUpdate} className="flex flex-col max-w-lg">
            <label className="mb-2">
                이름
                <input
                    name="name"
                    type="text"
                    className="border p-2 mb-4 rounded w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label className="mb-2">
                이메일
                <input
                    name="email"
                    type="email"
                    className="border p-2 mb-4 rounded w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label className="mb-4">
                비밀번호 변경 (선택 사항)
                <input
                    name="password"
                    type="password"
                    className="border p-2 mb-4 rounded w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="새 비밀번호 입력"
                />
            </label>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <button
                type="submit"
                className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${submitting ? `opacity-50 cursor-not-allowed` : ``}`}
                disabled={submitting}
            >
                {submitting ? `업데이트 중...` : `업데이트`}
            </button>
        </form>
    </>)
}
