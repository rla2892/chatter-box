import { sessionHelper } from "@/lib/auth"
import CreatePostForm from "@/components/CreatePostForm"

export default async function CreatePostPage() {
    const sessionObj = await sessionHelper()
    return <>
        <CreatePostForm session={sessionObj} />
    </>
};
