import { DB_API_URL } from '@/config'
import { UserType } from '@/types'

export async function getAllUsers(): Promise<UserType[]> {
    const res = await fetch(`${DB_API_URL}/users`)
    if (!res.ok) {
        throw new Error(`사용자 정보를 불러오는 데 실패했습니다.`)
    }
    const data: UserType[] = await res.json()
    return data
}