import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import CreatePostForm from "@/components/CreatePostForm"

export default async function CreatePostPage() {
    const sessionObj = await getServerSession(authOptions)
    return <>
        <CreatePostForm session={sessionObj} />
    </>
};
