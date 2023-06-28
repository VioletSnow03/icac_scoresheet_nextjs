'use server'

import styles from './homepage.module.scss'
import Image from 'next/image'
import RedirectionButton from './components/RedirectionButton/RedirectionButton'

export default async function Home() {
  return (
    <div className={styles.welcomeCard}>
      <div className={styles.logoWrapper}>
        <Image alt='ICAC scoresheet' className={styles.logoImage} src='/homepage/ICAC_scoresheet.png' fill></Image>
      </div>
      <h1 className={styles.welcomeText}>
        Welcome to ICAC Scoresheet
      </h1>
      <div className={styles.signUpRow}>
        <span>New archer?</span>
        <div className={styles.buttonWrapper}>
          <RedirectionButton href='/signup' backgroundColor='#5457ff' text='Sign Up' fontSize={'max(2vh,1vw)'} />
        </div>
      </div>
      <div className={styles.logInRow}>
        <span>Have an account?</span>
          <div className={styles.buttonWrapper}>
            <RedirectionButton href='/signin' backgroundColor='#ff5252' text='Sign In' fontSize={'max(2vh,1vw)'} />
          </div>
        </div>
    </div>
  )
}
