`
The Competition class encapsulates async methods to interact with all aspects of setting up and running a competition.
`

import PrismaModel from "./PrismaModel"
import { prisma } from '../singletons/prismadb'
import * as PrismaModelTypes from './types/prisma_model_types'
import { PrismaClient } from "@prisma/client"

type stringField = string | undefined
type dateField = Date | undefined
type arrayField<T> = T[] | undefined

export default class Competition extends PrismaModel {

    // type declarations
    prisma: PrismaClient
    competitionObject: PrismaModelTypes.Competition | undefined
    id: stringField
    name: stringField
    date: dateField
    university: stringField
    round: stringField
    archers: arrayField<string>
    judges: arrayField<string>
    rangeMasterId: stringField
    participants: arrayField<string>
    scoresheets: arrayField<PrismaModelTypes.Scoresheet>

    constructor (prismaClient: PrismaClient, competitionObject: PrismaModelTypes.Competition) {
        super()
        this.prisma = prismaClient
        this.competitionObject = competitionObject

        // if competitionId is provided, that means we are initializing an existing competition
        if (this.competitionObject.competitionId !== undefined) {    
            this.initializeExistingComp(competitionObject)
        }
    }

    /**
     * Creates a database copy of the `Competition` instance. The method only works when the object is initialized without a `competitionId` when passed the `competitionObject` - indicating the intent of creating a new `Competition`. Successful creation of a database copy mutates the instance attributes into its fully initialized state where `PrismaModelTypes.Competition` fields are now directly accessible as instance properties.
     * @returns `true` if successfully created `Competition` object, otherwise returns the `error` object for handling
     */
    public create = async (): Promise<true | unknown> => {

        if (this.competitionObject !== undefined) {
            try {
                // if create successful, return true
                const createCompetitionResponse = await prisma.competition.create({
                    data: {
                        ...this.competitionObject
                    }
                })

                this.initializeExistingComp(createCompetitionResponse as PrismaModelTypes.Competition)
                return true
            } catch (error) {
                // if create fails, return the error
                return error
            }
        } else {
            throw Error(`You initialized an existing Competition (${this.id}). You cannot create an identical copy.`)
        }

    }

    // private method to optionally initialize an existing Competition
    private initializeExistingComp = (competitionObject: PrismaModelTypes.Competition) => {
        const {
            competitionId,
            competitionName,
            competitionDate,
            university,
            round,
            archers,
            judges,
            rangeMasterId,
            participantIds,
            scoresheets
        } = competitionObject

        this.id = competitionId
        this.name = competitionName
        this.date = competitionDate
        this.university = university
        this.round = round
        this.archers = archers
        this.judges = judges
        this.rangeMasterId = rangeMasterId
        this.participants = participantIds
        this.scoresheets = scoresheets

        // just remove competitionObject
        this.competitionObject = undefined
    }

}