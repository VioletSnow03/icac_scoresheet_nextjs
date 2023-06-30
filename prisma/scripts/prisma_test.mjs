import { PrismaClient } from "@prisma/client";

console.log('prisma test')

const prisma = new PrismaClient()

async function createCompetition() {

    const address = {
        addressLine1: "Ethos Sports Centre",
        addressLine2: "Princes Gardens, Exhibition Road",
        postcode: "SW7 2BX",
        city: "London"
    }

    const competition = {
        competitionName: "SEAL 2023 Winter",
        university: "Imperial College London",
        round: "Portsmouth",
        address: address,
        rangeMasterId: "649c988bbc0c6da88243412f",
    }

    const prismaQuery = await prisma.competition.create({
        data: {
            ...competition,
            signUpSheet: {
                create: {
                    participantIds: ['6499fe4dbb2ca21da0a2aca6']
                }
            }
        }
    })

    console.log(prismaQuery)

}

// await createCompetition()

async function addCompetitionHost() {
    
    const prismaQuery = await prisma.competition.update({
        where: {
            competitionName: "SEAL 2023"
        },
        data: {
            rangeMasterId: '649c988bbc0c6da88243412f'
        }
    })

    console.log(prismaQuery)

}

// await addCompetitionHost()

async function retrieveRangMasterCompetition() {

    const prismaQuery = await prisma.rangeMaster.findFirst({
        where: {
            clubName: 'Imperial College Archery Club'
        },
        include: {
            competitionsHosted: true
        }
    })

    console.log(prismaQuery)
}

// await retrieveRangMasterCompetition()

async function retrieveCompetitionHost() {

    const prismaQuery = await prisma.competition.findFirst({
        where: {
            university: 'Imperial College London'
        },
        include: {
            hostedBy: true
        }
    })

    console.log(prismaQuery)

}

// await retrieveCompetitionHost()

async function createScoresheet() {

    const scoresheetForm = {
        archerName: 'Tristan Lim',
        round: 'Portsmouth',
        numberOfArrows: 60,
        scores: [
            [10,9,9],
            [10,8,10],
            [10,8,7],
            [9,9,9],
            [10,8,10]
        ]
    }

    const scoresheet = {
        target: 1,
        competitionId: '649d824a0f062b3ccd02e0aa',
        userId: '649d57c4f0c24266910e1480',
        scoresheet: scoresheetForm
    }

    const prismaQuery = await prisma.scoresheet.create({
        data: scoresheet
    })

    console.log(prismaQuery)

}

// await createScoresheet()


async function getCompetitionScoresheets() {

    const prismaQuery = await prisma.competition.findFirst({
        where: {
            competitionName: "SEAL 2023 Winter"
        },
        include: {
            scoresheets: true
        }
    })

    console.log(prismaQuery)

}

// await getCompetitionScoresheets()

async function getScoresheet() {

    const scoresheet = await prisma.scoresheet.findMany({
        where: {
            userId: {
                equals: '649d57c4f0c24266910e1480'
            }
        }
    })

    console.log(scoresheet)

}

await getScoresheet()