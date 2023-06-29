`
The User class encapsulates methods and fields that represent a User document within the User collection of the database.
`
import { PrismaClient } from "@prisma/client"
import { prisma } from "../prismadb"

type UserCredentials = {
    userId: string
    username: string
    firstName: string
    lastName: string
    university: string
    email: string
}

type Months = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type DateTimeParams = {
    year: number,
    month: Months,
    day: number,
}


class User {

    // instance field type declarations
    prisma: PrismaClient;
    credentials: UserCredentials;

    // constructor
    constructor( prismaClient: PrismaClient, userCredentials: UserCredentials) {
        this.prisma = prismaClient
        this.credentials = userCredentials
    }

    getScoresheets = async (date: DateTimeParams, when: 'before' | 'since' | 'on' | null) => {

        const queriedDate = new Date(date.year, date.month, date.day)
        const tomorrowDate = new Date(date.year, date.month, date.day)
        tomorrowDate.setDate(tomorrowDate.getDate() + 1) // get tomorrow's date

        let dateQuery: object
        
        // adjust query according to `when` parameter
        switch (when) {
            case null:
                dateQuery = {}
                break
            case 'on':
                dateQuery = {
                    gte: queriedDate,
                    lt: tomorrowDate
                }
                break
            case 'since':
                dateQuery = {
                    gte: queriedDate
                }
                break
            case 'before':
                dateQuery = {
                    lte: queriedDate
                }
                break
        }

        const userScoresheets = await this.prisma.scoresheet.findMany({
            where: {
                userId: this.credentials.userId,
                competitionDate: {
                    ...dateQuery
                }
            }
        })

        return userScoresheets

    }
}


// testing enviroment
console.log(module.children)