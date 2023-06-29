import NextAuth from "next-auth/next";
import {prisma} from '../../../libs/prismadb';
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require('bcrypt')

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    jwt: {
        maxAge: 60 * 60 * 3
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, request) {
                const { username, password } = credentials
                const userRecord = await prisma.user.findFirst({
                    where: {
                        username: username
                    }
                })

                // username not found
                if (userRecord === null) {
                    return null
                }

                // if user found, get the hashed password and compare to the given password
                const userPasswordHash = userRecord.passwordHash
                const passwordHashMatches = await bcrypt.compare(password, userPasswordHash)

                if (passwordHashMatches) {
                    return userRecord
                } else {
                    return null
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return '/user'
        },
        async jwt({token, user}) {
            // store user information in JWT for use in sessions later on
            if (user) {
                delete user.userId
                delete user.passwordHash
                delete user.signUpDate
                token.user = {
                    ...token.user,
                    ...user
                }
            }
            return token
        },
        // user object not passed in when using client-based sessions (such as JWT)
        async session({session, token, user}) {
            session = {
                ...session,
                ...token
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            if (url === '/') {
                return baseUrl
            } else {
                return url
            }
        }
    },
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}