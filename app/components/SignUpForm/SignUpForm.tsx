"use client";

import { FormControl, TextField, Select, Button, InputLabel, InputAdornment, IconButton, OutlinedInput, MenuItem } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./SignUpForm.module.scss";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SelectChangeEvent } from "@mui/material";
import { FormEvent } from "react";
import { Key } from "react";

type University = {
    name: String
}

export default function SignUpForm() {

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);
    const [universitiesList, setUniversitiesList] = useState<Array<University>>([])

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [university, setUniversity] = useState<String>('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    // handle password field
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    function handleUniversityChange (e: SelectChangeEvent<string>) {
        setUniversity(e.target.value)
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        // intercept submission
        event.preventDefault()

        const formFields = {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            university: university,
            password: password
        }

        const registerUserResponse = await fetch('/api/auth/register-user',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formFields)
        })

        if (registerUserResponse.status === 200) {
            // redirect back to homepage
            router.push('/')
        } else if (registerUserResponse.status === 409) {
            const responseBody = await registerUserResponse.json()

            switch (responseBody.failedUniqueConstraint) {
                case 'email':
                    setUsernameError(false)
                    setEmailError(true)
                    break
                case 'username':
                    setEmailError(false)
                    setUsernameError(true)
                    break
            }
        }

    }


    function renderUniversityOptions () {
        if (universitiesList.length === 0) {
            return null
        } else if (universitiesList.length > 0) {
            return universitiesList.map(university => (
                <MenuItem key={university.name as Key} value={university.name as any}>{university.name}</MenuItem>
            ));
        }
    }


    useEffect(() => {
        fetch('http://universities.hipolabs.com/search?country=United Kingdom')
        .then(res => res.json())
        .then(json => {
            setUniversitiesList(json)
        })
    }, [])

    return (
        <div className={styles.formWrapper}>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.signUpForm}>
                <TextField 
                error={usernameError}
                name='username' 
                label='Username' 
                variant='outlined' 
                margin='normal'
                helperText={usernameError ? 'username has been taken' : ''}
                onChange={event => setUsername(event.target.value)}
                required 
                fullWidth 
                />
                <TextField 
                error={emailError}
                name='email' 
                label='Email' 
                variant='outlined' 
                margin='normal'
                helperText={emailError ? 'email has been taken': ''}
                onChange={event => setEmail(event.target.value)}
                required 
                fullWidth 
                />
                <TextField 
                name='firstName' 
                label='First Name' 
                variant='outlined' 
                margin='normal'
                onChange={event => setFirstName(event.target.value)}
                required 
                fullWidth 
                />
                <TextField 
                name='lastName' 
                label='Last Name' 
                variant='outlined' 
                margin='normal'
                onChange={event => setLastName(event.target.value)}
                required 
                fullWidth 
                />
                <FormControl margin="normal">   
                    <InputLabel id='university-label'>University</InputLabel>
                    <Select
                    labelId="university-label"
                    name='university'
                    label='University'
                    onChange={handleUniversityChange}
                    required
                    >
                        {renderUniversityOptions()}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" margin='normal'>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            onChange={event => setPassword(event.target.value)}
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
                style={{marginTop: '4vh'}}
                variant="contained"
                size="large"
                type='submit'
                >
                    Sign Up
                </ Button>
            </form>
        </div>
    );
}
