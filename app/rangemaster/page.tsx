"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import SignOutButton from "../components/SignOutButton/SignOutButton";

type rangeMasterSession = {
    user: {
        rangeMasterId: String;
        university: String;
        clubName: String;
        email: String;
    }
};

export default async function RangeMasterPage() {
    const rangeMasterSession: rangeMasterSession | null = await getServerSession(authOptions as any);
    const rangeMaster = rangeMasterSession?.user

    console.log(rangeMasterSession)

    if (rangeMasterSession === null) {
        return (
            <>
                <h1>Please Sign In or Sign Up</h1>
                <Link href='/'>go back to homepage</Link>
            </>
        )
    } else {
        return (
            <>
                <h1>Welcome {rangeMaster?.clubName}</h1>
                <h3>{rangeMaster?.university}</h3>
                <SignOutButton />
            </>
        )
    }
}
