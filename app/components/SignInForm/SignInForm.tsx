'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import styles from './SignInForm.module.scss'
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface SignInFormProps {
    idFieldName: string,
    labelName: string,
    callbackUrl: string
}

export default function SignInForm({ idFieldName, labelName, callbackUrl }: SignInFormProps) {

    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    // return errors
    const [signInError, setSignInError] = useState(false)

    async function handleSignIn(event: any) {
        event.preventDefault()

        const form = new FormData(event.target)
        const idField = form.get(idFieldName)
        const password = form.get('password')

        console.log(idField, password)

        const signInResult = await signIn(labelName, {[idFieldName]: idField, password: password, redirect: false})

        console.log(signInResult)

        if (signInResult?.error) {
            setSignInError(true)
        } else {
            router.push(callbackUrl)
        }

    }

    return (
        <div className={styles.formWrapper}>
            <span>{labelName}</span>
            <form className={styles.signUpForm} onSubmit={handleSignIn}>
                <TextField 
                error={signInError}
                name={idFieldName} 
                label={idFieldName} 
                variant='outlined' 
                margin='normal'
                helperText={signInError ? 'wrong username or password' : ''}
                inputProps={{
                    style: {
                        fontSize: 'max(1vw, 1.8vh)',
                        height: '1.2vh'
                    }
                }}
                fullWidth 
                />
                <FormControl variant="outlined" margin='normal'>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            error={signInError}
                            inputProps={{
                                style: {
                                    fontSize: 'max(1vw, 1.8vh)',
                                    height: '1.2vh'
                                }
                            }}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                </FormControl>
                <Button 
                style={{marginTop: '2vh', fontSize: 'max(0.8vw, 1vh)'}}
                variant="contained"
                size="large"
                type='submit'
                >
                    Sign In
                </ Button>
            </form>
        </div>
    )
}