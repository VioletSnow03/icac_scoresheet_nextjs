'use server'

import styles from './SignUpPage.module.scss'
import SignUpForm from "../components/SignUpForm/SignUpForm";

export default async function SignUpPage() {

    return (
        <div className={styles.signUpSheet}>
            <h2>Sign Up</h2>
            <SignUpForm/>
        </div>
    )
}