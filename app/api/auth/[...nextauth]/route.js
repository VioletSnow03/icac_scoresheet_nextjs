import NextAuth from "next-auth/next";
import {prisma} from '../../../../libs/prismadb';
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
            name: 'ICAC Scoresheet Account',
            id: 'ICAC Scoresheet Account',
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

                // console.log(credentials)
                // console.log(userRecord)

                // username not found
                if (userRecord === null) {
                    return null
                }

                // if user found, get the hashed password and compare to the given password
                const RangeMasterPasswordHash = userRecord.passwordHash
                const passwordHashMatches = await bcrypt.compare(password, RangeMasterPasswordHash)

                if (passwordHashMatches) {
                    return userRecord
                } else {
                    return null
                }
            }
        }),
        CredentialsProvider({
            name: 'Range Master Account',
            id: 'Range Master Account',
            credentials: {
                club: {label: 'Club Name', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, request) {
                const { password, club } = credentials
                const RangeMasterRecord = await prisma.rangeMaster.findFirst({
                    where: {
                        clubName: club
                    }
                })

                // console.log(credentials)
                // console.log(RangeMasterRecord)

                // username not found
                if (RangeMasterRecord === null) {
                    return null
                }

                // if user found, get the hashed password and compare to the given password
                const RangeMasterPasswordHash = RangeMasterRecord.passwordHash
                const passwordHashMatches = await bcrypt.compare(password, RangeMasterPasswordHash)

                if (passwordHashMatches) {
                    return RangeMasterRecord
                } else {
                    return null
                }
            }
        },
        )
    ],
    callbacks: {
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
            if (url == '/') {
                return baseUrl
            } else {
                return url
            }
        }
    },
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}