`
The Competition class encapsulates async methods to interact with all aspects of setting up and running a competition.
`

import PrismaModel from "./PrismaModel"
import { Prisma } from "@prisma/client"
import { prisma } from '../singletons/prismadb'
import * as PrismaModelTypes from './types/prisma_model_types'
import { PrismaClient } from "@prisma/client"

type stringField = string | undefined
type dateField = Date | undefined
type arrayField<T> = T[] | undefined

/**
 * The `Competition` class encapsulates async methods to interact with all aspects of setting up and running a competition.
 */
export default class Competition extends PrismaModel {

    // type declarations
    prisma: PrismaClient

    constructor (prismaClient: PrismaClient, competitionRecord: PrismaModelTypes.CompetitionRecord) {
        super()
        this.prisma = prismaClient
        this.fullyInstantiateModel(competitionRecord)
    }

    /**
     * A static method to create new competitions.
     * @param prismaClient An instance of the `PrismaClient` object.
     * @param competition A `Prisma.CompetitionCreateInput` object created by forms submitted from the frontend.
     * @param instantiate Set to `true` to return an instance of the `Competition` class or `false` to return the `CompetitionRecord` object.
     * @returns `Competition | CompetitionRecord | error` depending on the success of the operation and `instantiate` parameter.
     */
    public static create = async (prismaClient: PrismaClient, competition: Prisma.CompetitionUncheckedCreateInput, instantiate: boolean=false): Promise<Competition | PrismaModelTypes.CompetitionRecord | unknown> => {
        
        try {
            const competitionRecord = await prismaClient.competition.create({
                data: competition
            })

            if (instantiate) {
                return new Competition(prismaClient, competitionRecord)
            } else if (!instantiate) {
                return competitionRecord
            }

        } catch (error) {
            return error
        }

    }
}



// testing environment
if (require.main === module) {

    const competition: PrismaModelTypes.CompetitionRecord = {
        competitionName: 'SEAL 2023 November',
        university: 'Imperial College London',
        competitionDate: new Date(2023,11,5),
        archers: [],
        judges: [],
        participantIds: [],
        address: {
            addressLine1: 'Ethos Sports Centre'
        }
    };

    (async () => {
        const newCompetition = await Competition.create(prisma, competition, true) as Competition
        console.log(newCompetition.id)
    })()

    

}