import NextAuth, { type Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getAllUsers } from "./db"
import bcrypt from "bcrypt"

export const authOptions = {
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
            authorize: async (credentials) => {
                const allUsers = await getAllUsers()
                const inputEmail = credentials?.email ?? ``
                const inputPassword = credentials?.password ?? ``
                const user = allUsers.find((user) => user.email === inputEmail)
                if (!user) {
                    return null
                }

                const isValid = await bcrypt.compare(inputPassword, user.password)

                if (!isValid) {
                    return null
                }
                return user
            }
        })
    ],
    // session: {
    //     strategy: "jwt",
    // },
    callbacks: {
        jwt({
            token,
            user
        }
            : {
                token: any
                user: any
            }
        ) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: ({
            session,
            token
        }: {
            session: Session
            token: any
        }
        ) => {
            if (token && session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },
    pages: {
        signIn: `/auth/signin`,
        signOut: `/auth/signout`,
        // error: `/auth/error`,
    },
    secret: process.env.NEXTAUTH_SECRET || `any-secret-key`,
}

export const handlers = NextAuth(authOptions)
