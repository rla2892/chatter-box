"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreatePostForm() {
    const router = useRouter()

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || "게시글 작성에 실패했습니다.")
            }

            // 게시글 작성 후 홈 페이지로 리디렉션
            router.push("/")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">게시글 작성</h1>
            <form onSubmit={handleSubmit} className="flex flex-col max-w-lg">
                <label className="mb-2">
                    제목
                    <input
                        type="text"
                        className="border p-2 mb-4 rounded w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="게시글 제목"
                        required
                    />
                </label>
                <label className="mb-2">
                    내용
                    <textarea
                        className="border p-2 mb-4 rounded w-full h-40"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="게시글 내용"
                        required
                    />
                </label>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={submitting}
                >
                    {submitting ? "작성 중..." : "게시글 작성"}
                </button>
            </form>
        </>
    )
}
