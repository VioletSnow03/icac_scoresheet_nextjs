import { prisma } from "@/app/libs/prismadb";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt')

export async function POST(req: NextRequest) {

    // console.log(req)
    // console.log(req.headers)

    const requestBody = await req.json()

    // console.log(requestBody)

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

        // console.log('user created')

        return NextResponse.json({}, {status: 200, headers: {'content-type': 'application/json'}})

    } catch (error: any) {

        // console.log('database error')
        // console.log(error)

        const failedUniqueConstraint = error.meta.target

        // console.log(failedUniqueConstraint)

        switch (failedUniqueConstraint) {
            case 'User_email_key':
                return NextResponse.json({failedUniqueConstraint: 'email'}, {status: 409, headers: {'content-type': 'application/json'}})
            case 'User_username_key':
                return NextResponse.json({failedUniqueConstraint: 'username'}, {status: 409, headers: {'content-type': 'application/json'}})
        }

    }
    

    
}