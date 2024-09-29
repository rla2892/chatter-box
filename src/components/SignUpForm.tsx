"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import { BASE_URL } from "@/config"
import { useRouter } from "next/navigation"

export default function SignUpForm() {
    const [name, setName] = useState<string>(``)
    const [email, setEmail] = useState<string>(``)
    const [password, setPassword] = useState<string>(``)
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        // GUID 생성
        const id = uuidv4()

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            id,
            name,
            email,
            password: hashedPassword,
        }

        try {
            const res = await fetch(`${BASE_URL}/api/register`, {
                method: `POST`,
                headers: {
                    "Content-Type": `application/json`,
                },
                body: JSON.stringify(newUser),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || `회원가입에 실패했습니다.`)
            }

            // 회원가입 성공 시 로그인 페이지로 이동
            router.push(`/auth/signin`)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-lg">
                <input
                    type="text"
                    className="border p-2 mb-4 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                    required
                />
                <input
                    type="email"
                    className="border p-2 mb-4 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    required
                />
                <input
                    type="password"
                    className="border p-2 mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    required
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${submitting ? `opacity-50 cursor-not-allowed` : ``}`}
                    disabled={submitting}
                >
                    {submitting ? `가입 중...` : `가입`}
                </button>
            </form>
        </>
    )
}