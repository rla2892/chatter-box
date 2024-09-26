"use client"
import { getCsrfToken, signIn } from "next-auth/react"
import { useEffect, useState } from "react"

export default function LoginForm() {
    const [email, setEmail] = useState<string>(``)
    const [password, setPassword] = useState<string>(``)
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [csrfToken, setCsrfToken] = useState<string>(``)

    useEffect(() => {
        getCsrfToken().then((newCsrfToken) => setCsrfToken(newCsrfToken || ``))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        const res = await signIn(`credentials`, {
            redirect: false,
            email,
            password,
        })

        if (res?.error) {
            setError(res.error)
        } else {
            // 로그인 성공 시 메인 페이지로 이동
            alert(`로그인 성공!`)
        }

        setSubmitting(false)
    }

    return <form onSubmit={handleSubmit} className="flex flex-col max-w-lg">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
            비밀번호
            <input
                name="password"
                type="password"
                className="border p-2 mb-4 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </label>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${submitting ? `opacity-50 cursor-not-allowed` : ``}`}
            disabled={submitting}
        >
            {submitting ? `로그인 중...` : `로그인`}
        </button>
    </form>
}