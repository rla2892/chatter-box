"use client"

import { useState } from "react"
import bcrypt from "bcryptjs"
import { useRouter } from "next/navigation"
import { registerUserAction } from "@/lib/actions/users"

export default function SignUpForm() {
    const router = useRouter()

    const [name, setName] = useState<string>(``)
    const [email, setEmail] = useState<string>(``)
    const [password, setPassword] = useState<string>(``)
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const handleSubmit = async (formData: FormData) => {
        setSubmitting(true)
        setError(null)

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10)
        formData.set("password", hashedPassword)

        try {
            await registerUserAction(formData)
            alert("사용자가 성공적으로 등록되었습니다.")
            router.push("/")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <form action={handleSubmit} className="flex flex-col max-w-lg">
                <input
                    name="name"
                    type="text"
                    className="border p-2 mb-4 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                    required
                />
                <input
                    name="email"
                    type="email"
                    className="border p-2 mb-4 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    required
                />
                <input
                    name="password"
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
                    className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={submitting}
                >
                    {submitting ? "등록 중..." : "회원가입"}
                </button>
            </form>
        </>
    )
}