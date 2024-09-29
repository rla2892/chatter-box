"use client"

import { useState } from "react"
import Image from "next/image"
import { PostType } from "../types"

type PostProps = PostType;

export default function Post({ id, userId, content, image, createdAt, likes }: PostProps) {
    const [likeCount, setLikeCount] = useState<number>(likes)

    const handleLike = async () => {
        const updatedLikes = likeCount + 1
        setLikeCount(updatedLikes)

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: `PUT`,
                headers: {
                    "Content-Type": `application/json`,
                },
                body: JSON.stringify({ likes: updatedLikes }),
            })

            if (!res.ok) {
                throw new Error(`좋아요 업데이트에 실패했습니다.`)
            }
        } catch (error) {
            alert(`좋아요 업데이트에 실패했습니다. ${error}`)
            setLikeCount(likeCount) // 오류 발생 시 원래 좋아요 수로 되돌림
        }
    }

    return (
        <div className="border p-4 mb-4 rounded shadow bg-white hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-2">
                {/* 사용자 정보 표시 (추가 구현 필요) */}
                <div className="ml-2">
                    <p className="font-semibold">사용자 {userId}</p>
                    <p className="text-gray-500 text-sm">{new Date(createdAt).toLocaleString()}</p>
                </div>
            </div>
            <p className="mb-2">{content}</p>
            {image && (
                <div className="mb-2">
                    <Image src={image} alt="Post Image" width={500} height={300} className="rounded" />
                </div>
            )}
            <div className="flex items-center">
                <button
                    onClick={handleLike}
                    className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                        />
                    </svg>
                    좋아요 {likeCount}
                </button>
                {/* 댓글, 공유 등 추가 기능 버튼 가능 */}
            </div>
        </div>
    )
}
