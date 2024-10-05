"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPostAction } from "@/lib/actions/posts"

export default function CreatePostForm() {
    const router = useRouter()

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)

    async function onCreatePost(formData: FormData) {
        try {
            await createPostAction(formData)

            // Show success message
            alert("게시글이 성공적으로 작성되었습니다.")

            router.push("/")
        } catch (error: any) {
            const errorMessage = `게시글 작성에 실패했습니다. ${error?.message ?? "알 수 없는 오류가 발생했습니다."}`
            setError(errorMessage)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">게시글 작성</h1>
            <form action={onCreatePost} className="flex flex-col max-w-lg">
                <label className="mb-2">
                    제목
                    <input
                        type="text"
                        className="border p-2 mb-4 rounded w-full"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value.toString().trim())}
                        placeholder="게시글 제목"
                        required
                    />
                </label>
                <label className="mb-2">
                    내용
                    <textarea
                        className="border p-2 mb-4 rounded w-full h-40"
                        name="content"
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
