'use client'

import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

export default function SignOutButton() {

    function handleSignOut() {
        signOut({callbackUrl: '/'})
    }

    return (
        <Button onClick={handleSignOut} variant="contained">Sign Out</Button>
    )
}