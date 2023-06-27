import { prisma } from "@/app/libs/prismadb";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt')

export async function POST(req: NextRequest) {

    const requestBody = await req.json()

    const passwordSalt = await bcrypt.genSalt(10)
    requestBody.passwordHash = await bcrypt.hash(requestBody.password, passwordSalt)

    // delete password
    delete requestBody.password

    try {
        await prisma.user.create({
            data: {
                ...requestBody
            }
        })

        return NextResponse.json({}, {status: 200})

    } catch (error: any) {

        const failedUniqueConstraint = error.meta.target

        switch (failedUniqueConstraint) {
            case 'User_email_key':
                return NextResponse.json({failedUniqueConstraint: 'email'}, {status: 409})
            case 'User_username_key':
                return NextResponse.json({failedUniqueConstraint: 'username'}, {status: 409})
        }

    }
    

    
}