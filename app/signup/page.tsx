'use server'

import styles from './SignUpPage.module.scss'
import SignUpForm from "./ClientComponents/SignUpForm";

export async function fetchUniversitiesList() {
    const fetchResponse = await fetch('http://universities.hipolabs.com/search?country=United Kingdom')
    const universitiesList: Array<object> = await fetchResponse.json()
    console.log(universitiesList)
    return universitiesList
}

export default async function SignUpPage() {

    return (
        <div className={styles.signUpSheet}>
            <h2>Sign Up</h2>
            <SignUpForm/>
        </div>
    )
}