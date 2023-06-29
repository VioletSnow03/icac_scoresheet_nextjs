'use server'

import styles from './SignInPage.module.scss'
import SignInForm from '../components/SignInForm/SignInForm'

export default async function SignUpPage() {

    return (
        <>
            <div className={styles.signUpCard}>
                <h1>Sign In</h1>
                <SignInForm labelName='ICAC Scoresheet Account' idFieldName='username' callbackUrl='/user' />
                <SignInForm labelName='Range Master Account' idFieldName='club' callbackUrl='/rangemaster' />
            </div>
        </>
    )
}