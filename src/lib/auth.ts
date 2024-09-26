import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getAllUsers } from './db'

export const handlers = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: `Email`,
                    type: `email`,
                    placeholder: `please enter your email`,
                },
                password: {
                    label: `Password`,
                    type: `password`,
                },
            },
            authorize: async (credentials, req) => {
                const allUsers = await getAllUsers()
                const inputEmail = credentials?.email ?? ``
                const inputPassword = credentials?.password ?? ``
                const user = allUsers.find((user) => user.email === inputEmail)
                if (!user) {
                    return null
                }
                if (user.password !== inputPassword) {
                    return null
                }
                return user
            }
        })
    ],
    pages: {
        signIn: `/auth/signin`,
        signOut: `/auth/signout`,
        // error: `/auth/error`,
    },
    secret: process.env.NEXTAUTH_SECRET || `any-secret-key`,
})
