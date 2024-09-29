"use client"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
    const handleLogout = async () => {
        await signOut()
    }

    return <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
        로그아웃
    </button>
}