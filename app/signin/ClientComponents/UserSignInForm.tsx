'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import styles from './UserSignInForm.module.scss'
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { useState } from 'react'

export default function UserSignInForm() {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.signUpForm}>
                <TextField 
                // error={usernameError}
                name='username' 
                label='Username' 
                variant='outlined' 
                margin='normal'
                // helperText={usernameError ? 'username has been taken' : ''}
                // onChange={event => setUsername(event.target.value)}
                required 
                fullWidth 
                />
                <FormControl variant="outlined" margin='normal'>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            // onChange={event => setPassword(event.target.value)}
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
            </form>
        </div>
    )
}