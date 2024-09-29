import ProfileForm from "@/components/ProfileForm"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getUserById } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
    const sessionObj = await getServerSession(authOptions)
    const userInfo = await getUserById(sessionObj?.user?.id ?? ``)
    if (!userInfo) {
        redirect(`/auth/signin`)
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">프로필</h1>
            <ProfileForm session={sessionObj} userInfo={userInfo} />
        </>
    )
}
