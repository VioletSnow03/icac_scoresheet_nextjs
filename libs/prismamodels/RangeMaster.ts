`
The RangeMaster class encapsulates async methods to create and manage competitions.
`

import { PrismaClient } from "@prisma/client"
import { prisma } from "../singletons/prismadb"
import * as PrismaModelTypes from './types/prisma_model_types'
import PrismaModel from "./PrismaModel"
import Competition from "./Competition"

class RangeMaster extends PrismaModel {

    // instance variable type declarations
    prisma: PrismaClient;
    credentials: PrismaModelTypes.RangeMasterCredentials

    constructor (prismaClient: PrismaClient, rangeMasterCredentials: PrismaModelTypes.RangeMasterCredentials) {
        super()
        this.prisma = prismaClient
        this.credentials = rangeMasterCredentials
    }

    /**
     * @param competition A `Competition` object detailing at least the required fields to create a `Competition`.
     * @returns The successfuly created `Competition` object, otherwise returns the `error` object for handling
     */
    public createCompetition = async (competition: PrismaModelTypes.Competition): Promise<Competition | unknown> => {

        competition.rangeMasterId = this.credentials.rangeMasterId

        const newCompetition = new Competition(this.prisma, competition)
        const createResponse = await newCompetition.create()

        if (createResponse === true) {
            return newCompetition
        } else {
            // if error
            return createResponse
        }

    }

    /**
     * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
     * @param when provide a search directive to retrieve `Competitions` created `before | since | on` the date
     * @returns an array of matching `Competition` objects or `null` if no records were found
     */
    public getCompetitions = async (date?: PrismaModelTypes.DateTimeParams, when?: PrismaModelTypes.DateTimeSpecifier): Promise<PrismaModelTypes.Competition[]> => {

        const dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {}

        const competitions: {competitionsHosted: PrismaModelTypes.Competition[]} = await prisma.rangeMaster.findFirst({
            where: {
                rangeMasterId: this.credentials.rangeMasterId
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
        }) as {competitionsHosted: PrismaModelTypes.Competition[]}

        return competitions.competitionsHosted

    }

}


if (require.main === module) {

    const competition: PrismaModelTypes.Competition = {
        competitionName: 'SEAL 2024 November',
        university: 'Imperial College London',
        competitionDate: new Date(2024,11,5),
        address: {
            addressLine1: 'Ethos Sports Centre'
        }
    };

    (async () => {
        const rangeMasterCreds = await prisma.rangeMaster.findFirst({
            where: {
                clubName: 'Imperial College Archery Club'
            }
        }) as PrismaModelTypes.RangeMasterCredentials

        const rangeMaster = new RangeMaster(prisma, rangeMasterCreds)
        const competitions = await rangeMaster.getCompetitions()
        console.log('before creating: ',competitions)
        const competitionCreated: any = await rangeMaster.createCompetition(competition)
        const moreCompetitions = await rangeMaster.getCompetitions()

        if (competitionCreated.id !== undefined) {
            console.log(competitionCreated.id)
        } else {
            console.log('error: ', competitionCreated)
        }
    })()

}