'use server'

import styles from './SignInPage.module.scss'
import SignInForm from './ClientComponents/SignInForm'

export default async function SignUpPage() {

    return (
        <>
            <div className={styles.signUpCard}>
                <h1>Sign In</h1>
                <SignInForm />
            </div>
        </>
    )
}