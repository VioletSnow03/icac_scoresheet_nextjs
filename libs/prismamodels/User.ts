`
The User class encapsulates async methods and fields that represent a User document within the User collection of the database.
`
import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
import { prisma } from "../singletons/prismadb"
import * as PrismaModelTypes from './types/prisma_model_types'
import PrismaModel from "./PrismaModel"
import Scoresheet from "./Scoresheet"
import Competition from "./Competition"

interface UserCredentials { 
    id: string; 
    username: string; 
    firstName: string; 
    lastName: string; 
    university: string; 
    email: string; 
    passwordHash: string; 
    signUpDate: Date; 
    competitionIds: string[]; 
    signUpSheetIds: string[]; 
}

/**
 * Instantiate the `User` class with a `PrismaClient` instance and `UserCredentials` retrieved from session contexts.
 * Provides an interface to get related `User` data from the database.
 */
export default class User extends PrismaModel {

    // instance variable type declarations
    prisma: PrismaClient;

    // constructor
    constructor(prismaClient: PrismaClient, userCredentials: PrismaModelTypes.UserCredentials) {
        super()
        this.prisma = prismaClient
        this.fullyInstantiateModel(userCredentials)
        // remove password
        delete this.passwordHash
    }

    /**
     * A static method to create new users.
     * @param prismaClient An instance of the `PrismaClient` object.
     * @param userCredentials A `UserCreateInput` object created by forms submitted from the frontend.
     * @param instantiate Set to `true` to return an instance of the `User` class or `false` to return the `UserCredentials` object.
     * @returns `UserCredentials | User instance | error` depending on the success of the operation and `instantiate` parameter.
     */
    public static create = async (prismaClient: PrismaClient, userCredentials: Prisma.UserCreateInput, instantiate: boolean=false): Promise<User | UserCredentials | unknown> => {

        try {
            const newUser = await prismaClient.user.create({
                data: userCredentials
            })

            if (instantiate) {
                return new User(prismaClient, newUser)
            } else if (!instantiate) {
                return newUser
            }

        } catch (error) {
            return error
        }

    }

    /**
     * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
     * @param when provide a search directive to retrieve `SignUpSheets` created `before | since | on` the date
     * @returns an `Array` of matching `SignUpSheet` objects or `null` if no records were found
     */
    // public getSignUpSheets = async (date?: PrismaModelTypes.DateTimeParams, when?: PrismaModelTypes.DateTimeSpecifier): Promise<PrismaModelTypes.SignUpSheet[]> => {


    // }

    /**
     * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
     * @param when provide a search directive to retrieve Scoresheets created `before | since | on` the date
     * @returns an array of matching `Scoresheet` objects or `null` if no records were found
     */
    public getScoresheets = async (date?: PrismaModelTypes.DateTimeParams, when?: PrismaModelTypes.DateTimeSpecifier): Promise<Scoresheet[] | undefined> => {

        const dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {}

        const userScoresheets: { scoresheets: PrismaModelTypes.ScoresheetRecord[] } | null = await this.prisma.user.findFirst({
            where: {
                id: this.id as string
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
        })

        const scoresheets = userScoresheets?.scoresheets.map(scoresheetObj => {
            return new Scoresheet(this.prisma, scoresheetObj)
        })

        return scoresheets

    }

    /**
     * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
     * @param when provide a search directive to retrieve `Competitions` created `before | since | on` the date
     * @returns an array of matching `Competition` objects or `null` if no records were found
     */
    public getCompetitions = async (date?: PrismaModelTypes.DateTimeParams, when?: PrismaModelTypes.DateTimeSpecifier): Promise<Competition[] | []> => {

        const dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {}

        const userCompetitions: { competitions: PrismaModelTypes.CompetitionRecord[] } | null = await this.prisma.user.findFirst({
            where: {
                id: this.id as string
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
        })

        if (userCompetitions !== null) {
            return userCompetitions.competitions.map(competition => new Competition(this.prisma, competition))
        } else {
            return []
        }

    }

}






async function getUser() {
    return await prisma.user.findFirst({
        where: {
            firstName: "Tristan",
            lastName: "Lim"
        }
    }) as PrismaModelTypes.UserCredentials
}


// testing enviroment
if (require.main === module) {

    // const bcrypt = require('bcrypt')

    // immediately calls async function to avoid callback hell
    (async () => {
        const userCreds = await getUser()
        console.log(userCreds)
        const user = new User(prisma, userCreds)
        const scoresheets = await user.getScoresheets()

        if (scoresheets !== undefined) {
            for (const scoresheet of scoresheets) {
                console.log(scoresheet.scoresheet)
            }
        }
    })()

}