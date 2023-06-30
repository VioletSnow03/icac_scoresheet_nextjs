`
The RangeMaster class encapsulates async methods to create and manage competitions.
`

import { PrismaClient } from "@prisma/client"
import { prisma } from "../prismadb"
import * as EntityTypes from './types/entity_types'
import Entity from "./Entity"

class RangeMaster extends Entity {

    // instance variable type declarations
    prisma: PrismaClient;
    credentials: EntityTypes.RangeMasterCredentials

    constructor (prismaClient: PrismaClient, rangeMasterCredentials: EntityTypes.RangeMasterCredentials) {
        super()
        this.prisma = prismaClient
        this.credentials = rangeMasterCredentials
    }

    /**
     * @param competition A `Competition` object detailing at least the required fields to create a `Competition`.
     * @returns `true` if the `Competition` was successfully created, otherwise returns the `error` object for handling
     */
    public createCompetition = async (competition: EntityTypes.Competition): Promise<true | unknown> => {

        competition.rangeMasterId = this.credentials.rangeMasterId

        try {
            // if create successful, return true
            const createCompetitionResponse = await prisma.competition.create({
                data: {
                    ...competition
                }
            })
            return true
        } catch (error) {
            // if create fails, return the error
            return error
        }

    }

    /**
     * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
     * @param when provide a search directive to retrieve `Competitions` created `before | since | on` the date
     * @returns an array of matching `Competition` objects or `null` if no records were found
     */
    public getCompetitions = async (date?: EntityTypes.DateTimeParams, when?: EntityTypes.DateTimeSpecifier): Promise<EntityTypes.Competition[]> => {

        const dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {}

        const competitions: {competitionsHosted: EntityTypes.Competition[]} = await prisma.rangeMaster.findFirst({
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
        }) as {competitionsHosted: EntityTypes.Competition[]}

        return competitions.competitionsHosted

    }

}


if (require.main === module) {

    const competition: EntityTypes.Competition = {
        competitionName: 'SEAL 2023 Spring',
        university: 'Imperial College London',
        competitionDate: new Date(2024,2,20),
        address: {
            addressLine1: 'Ethos Sports Centre'
        }
    };

    (async () => {
        const rangeMasterCreds = await prisma.rangeMaster.findFirst({
            where: {
                clubName: 'Imperial College Archery Club'
            }
        }) as EntityTypes.RangeMasterCredentials

        const rangeMaster = new RangeMaster(prisma, rangeMasterCreds)
        const competitions = await rangeMaster.getCompetitions()
        console.log('before creating: ',competitions)
        const competitionCreated = await rangeMaster.createCompetition(competition)
        const moreCompetitions = await rangeMaster.getCompetitions()

        if (competitionCreated === true) {
            console.log('after creating: ', moreCompetitions)
        } else {
            console.log('creating competition error: ',competitionCreated)
        }
    })()

}