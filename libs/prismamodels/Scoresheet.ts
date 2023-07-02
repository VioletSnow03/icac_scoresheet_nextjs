import PrismaModel from "./PrismaModel"
import { prisma } from '../singletons/prismadb'
import * as PrismaModelTypes from './types/prisma_model_types'
import { Prisma, PrismaClient } from "@prisma/client"

/**
 * The `Scoresheet` class encapsulates methods to build and create scoresheets.
 */
export default class Scoresheet extends PrismaModel {

    // field type declarations
    prisma: PrismaClient

    constructor(prismaClient: PrismaClient, scoresheetRecord: PrismaModelTypes.ScoresheetRecord) {
        super()
        this.prisma = prismaClient
        this.fullyInstantiateModel(scoresheetRecord)
    }

    /**
     * A static method to create new scoresheets.
     * @param prismaClient An instance of the `PrismaClient` object.
     * @param scoresheet A `Prisma.ScoresheetCreateInput` object created by forms submitted from the frontend.
     * @param instantiate Set to `true` to return an instance of the `Scoresheet` class or `false` to return the `ScoresheetRecord` object.
     * @returns `Scoresheet | ScoresheetRecord | error` depending on the success of the operation and `instantiate` parameter.
     */
    public static create = async (prismaClient: PrismaClient, scoresheet: Prisma.ScoresheetCreateInput, instantiate: boolean=false): Promise<Scoresheet | PrismaModelTypes.ScoresheetRecord | unknown> => {
        
        try {
            const scoresheetRecord = await prismaClient.scoresheet.create({
                data: scoresheet
            })

            if (instantiate) {
                return new Scoresheet(prismaClient, scoresheetRecord)
            } else if (!instantiate) {
                return scoresheetRecord
            }
        } catch (error) {
            return error
        }

    }

    /**
     * Synchronizes `Scoresheet` record in the database with the current instance.
     */
    public save = async () => {

        this.checkIdExists()
        
        const saveResponse = await this.prisma.scoresheet.update({
            where: {
                id: this.id
            },
            data: {
                scoresheet: this.scoresheet
            }
        })

        return saveResponse
    }

    /**
     * Formats the existing `Scoresheet` to the specified round.
     */
    public setRound = async (roundName: string, overwrite: boolean=false) => {

        // check if there is already a scoresheet set, raise a warning if so
        if (this.scoresheet !== undefined && !overwrite) {
            throw new Error(`The current scoresheet has been initialized with a ${this.round}`)
        }

        const roundFormat = await this.prisma.round.findFirst({
            where: {
                round: roundName
            },
            select: {
                scoresheetFormat: true
            }
        })

        this.scoresheet
    }

}




if (require.main === module) {
    const scoresheetObj: PrismaModelTypes.ScoresheetRecord = {
        target: 2,
        competitionId: '649d66bb15f64e0894a91cf9',
        userId: '649d57c4f0c24266910e1480',
        competitionName: 'SEAL 2023',
        round: 'Porstmouth',
        scoresheet: {
            dummyScores: [
                [10,10,10],
                [9,10,10],
                [9,10,9],
            ]
        }
    }

}