'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import styles from './UserPage.module.scss'
import Link from "next/link"
import SignOutButton from "./ClientComponents/SignOutButton"

type UserSession = {
    user: {
        email: string,
        username: string,
        firstName: string,
        lastName: string,
        university: string
    }
}

export default async function UserPage() {

    const userSession: UserSession | null = await getServerSession(authOptions as any)
    const user = userSession?.user

    // check if client is logged in, conditionally render different pages
    if (userSession === null) {
        return (
            <> 
                <h1>Please Sign In or Sign Up</h1>
                <Link href={'/'} prefetch>go back to homepage</Link>
            </>
        )
    } else {
        return (
            <>
                <div className={styles.userPageContainer}>
                    <div className={styles.userInfo}>
                        <h1>Welcome {user?.firstName} {user?.lastName}</h1>
                        <h3>{user?.university}</h3>
                        <h3>{user?.username}</h3>
                    </div>
                    <SignOutButton></SignOutButton>
                </div>
            </>
        )
    }

}