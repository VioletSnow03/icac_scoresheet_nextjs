`
The User class encapsulates async methods and fields that represent a User document within the User collection of the database.
`
import { PrismaClient } from "@prisma/client"
import { prisma } from "../prismadb"
import * as EntityTypes from './types/entity_types'
import Entity from "./Entity"

/**
 * Instantiate the `User` class with a `PrismaClient` instance and `UserCredentials` retrieved from session contexts.
 * Provides an interface to get related `User` data from the database.
 */
export default class User extends Entity {

    // instance variable type declarations
    prisma: PrismaClient;
    credentials: EntityTypes.UserCredentials;

    // constructor
    constructor( prismaClient: PrismaClient, userCredentials: EntityTypes.UserCredentials) {
        super()
        this.prisma = prismaClient
        this.credentials = userCredentials
    }

    /**
     * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
     * @param when provide a search directive to retrieve `SignUpSheets` created `before | since | on` the date
     * @returns an `Array` of matching `SignUpSheet` objects or `null` if no records were found
     */
    public getSignUpSheets = async (date?: EntityTypes.DateTimeParams, when?: EntityTypes.DateTimeSpecifier): Promise<EntityTypes.SignUpSheet[]> => {

        const dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {}

        const userSignUpSheets: {signUpSheets: EntityTypes.SignUpSheet[]} = await this.prisma.user.findFirst({
            where: {
                userId: this.credentials.userId
            },
            select: {
                signUpSheets: {
                    where: {
                        competitionDate: {
                            ...dateTimeQuery
                        }
                    }
                }
            }
        }) as {signUpSheets: EntityTypes.SignUpSheet[]}

        return userSignUpSheets.signUpSheets

    }

    /**
     * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
     * @param when provide a search directive to retrieve Scoresheets created `before | since | on` the date
     * @returns an array of matching `Scoresheet` objects or `null` if no records were found
     */
    public getScoresheets = async (date?: EntityTypes.DateTimeParams, when?: EntityTypes.DateTimeSpecifier): Promise<EntityTypes.Scoresheet[]> => {

        const dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {}

        const userScoresheets: {scoresheets: EntityTypes.Scoresheet[]} | null = await this.prisma.user.findFirst({
            where: {
                userId: this.credentials.userId
            },
            select: {
                scoresheets: {
                    where: {
                        competitionDate: {
                            ...dateTimeQuery
                        }
                    }
                }
            }
        }) as {scoresheets: EntityTypes.Scoresheet[]}

        return userScoresheets.scoresheets

    }

    /**
     * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
     * @param when provide a search directive to retrieve `Competitions` created `before | since | on` the date
     * @returns an array of matching `Competition` objects or `null` if no records were found
     */
    public getCompetitions = async (date?: EntityTypes.DateTimeParams, when?: EntityTypes.DateTimeSpecifier): Promise<EntityTypes.Competition[]> => {

        const dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {}

        const userCompetitions: {competitions: EntityTypes.Competition[]} = await this.prisma.user.findFirst({
            where: {
                userId: this.credentials.userId
            },
            select: {
                competitions: {
                    where: {
                        competitionDate: {
                            ...dateTimeQuery
                        }
                    }
                }
            }
        }) as {competitions: EntityTypes.Competition[]}

        return userCompetitions.competitions

    }

}






async function getUser() {
    return await prisma.user.findFirst({
        where: {
            firstName: "Tristan",
            lastName: "Lim"
        }
    }) as EntityTypes.UserCredentials
}


// testing enviroment
if (require.main === module) {

    // immediately calls async function to avoid callback hell
    (async () => {
        const userCreds = await getUser()
        console.log(userCreds)
        const user = new User(prisma, userCreds)
        const scoresheet = await user.getScoresheets()
        console.log(scoresheet)
        const signUpSheets = await user.getSignUpSheets()
        console.log(signUpSheets)
        const competitions = await user.getCompetitions()
        console.log(competitions)
    }) ()

}