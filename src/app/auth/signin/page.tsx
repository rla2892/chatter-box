import Link from "next/link"
import LoginForm from "@/components/LoginForm"

export default async function SignInPage() {

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">로그인</h1>
            <LoginForm />
            <p className="mt-4">
                아직 회원이 아니신가요?{` `}
                <Link href="/auth/signup" className="text-blue-600 hover:underline">
                    회원가입
                </Link>
            </p>
        </>
    )
}

