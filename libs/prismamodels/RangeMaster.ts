`
The RangeMaster class encapsulates async methods to create and manage competitions.
`

import { PrismaClient } from "@prisma/client"
import { prisma } from "../singletons/prismadb"
import { Prisma } from "@prisma/client"
import * as PrismaModelTypes from './types/prisma_model_types'
import PrismaModel from "./PrismaModel"
import Competition from "./Competition"

interface RangeMasterCredentials {
    id: string;
    university: string;
    clubName: string;
    email: string;
    passwordHash: string;
    signUpDate: Date;
}

/**
 * If you are instantiating an existing record, ensure that the record has an `id` property corresponding to the `rangeMaster.id` property.
 */
export default class RangeMaster extends PrismaModel {

    // instance variable type declarations
    prisma: PrismaClient;

    constructor (prismaClient: PrismaClient, rangeMasterCredentials: RangeMasterCredentials) {
        super()
        this.prisma = prismaClient
        this.fullyInstantiateModel(rangeMasterCredentials)
        delete this.passwordHash
    }

    /**
     * A static method to create new RangeMasters.
     * @param prismaClient An instance of the `PrismaClient` object.
     * @param rangeMasterCredentials A `RangeMasterCreateInput` object created by forms submitted from the frontend.
     * @param instantiate Set to `true` to return an instance of the `User` class or `false` to return the `UserCredentials` object.
     * @returns `RangeMasterCredentials | RangeMaster instance | error` depending on the success of the operation and `instantiate` parameter.
     */
    public static create = async (prismaClient: PrismaClient, rangeMasterCredentials: Prisma.RangeMasterCreateInput, instantiate: boolean=false): Promise<RangeMasterCredentials | RangeMaster | unknown> => {

        try {

            const newRangeMaster = await prismaClient.rangeMaster.create({
                data: rangeMasterCredentials
            })

            if (instantiate) {
                return new RangeMaster(prismaClient, newRangeMaster)
            } else if (!instantiate) {
                return newRangeMaster
            }

        } catch (error) {
            return error
        }

    }


    /**
     * @param competition A `Competition` object detailing at least the required fields to create a `Competition`.
     * @returns The successfuly created `Competition` object, otherwise returns the `error` object for handling
     */
    public createCompetition = async (competition: Prisma.CompetitionUncheckedCreateInput, instantiate: boolean=true): Promise<Competition | unknown> => {
        competition.rangeMasterId = this.id
        return await Competition.create(this.prisma, competition, instantiate)
    }

    /**
     * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
     * @param when provide a search directive to retrieve `Competitions` created `before | since | on` the date
     * @returns an array of matching `Competition` objects or `null` if no records were found
     */
    public getCompetitions = async (date?: PrismaModelTypes.DateTimeParams, when?: PrismaModelTypes.DateTimeSpecifier): Promise<Competition[] | []> => {

        const dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {}

        const competitions: {competitionsHosted: PrismaModelTypes.CompetitionRecord[]} | null = await prisma.rangeMaster.findFirst({
            where: {
                id: this.id
            },
            select: {
                competitionsHosted: {
                    where: {
                        competitionDate: {
                            ...dateTimeQuery
                        }
                    }
                }
            }
        }) as {competitionsHosted: []}

        if (competitions !== null) {
            return competitions.competitionsHosted.map(competition => new Competition(this.prisma, competition))
        } else {
            return []
        }

    }

}


if (require.main === module) {

    const bcrypt = require('bcrypt')

    const competition: PrismaModelTypes.CompetitionRecord = {
        competitionName: 'SEAL 2023 November',
        university: 'University of London',
        competitionDate: new Date(2023,11,5),
        archers: [],
        judges: [],
        participantIds: [],
        address: {
            addressLine1: 'Ethos Sports Centre'
        }
    };

    (async () => {

        const rangeMasterCredentials = await prisma.rangeMaster.findFirst({
            where: {
                clubName: 'UoL Archers'
            }
        }) as PrismaModelTypes.RangeMasterRecord

        console.log(rangeMasterCredentials)

        const rangeMaster = new RangeMaster(prisma, rangeMasterCredentials)
        console.log(rangeMaster.passwordHash)
        console.log(rangeMaster.id)
        console.log(rangeMaster.university)
        
        // const createdCompetition = await rangeMaster.createCompetition(competition, false)
        // console.log(createdCompetition)
        console.log(await rangeMaster.getCompetitions())

    })()

}