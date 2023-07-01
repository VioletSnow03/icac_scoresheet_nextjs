import { Prisma } from "@prisma/client"

export type UserCredentials = {
    userId?: string
    username: string
    firstName: string
    lastName: string
    university: string
    email: string
}

export type RangeMasterCredentials = {
    rangeMasterId: string
    university: string
    clubName: string
    email: string
    signUpDate: Date
}

export type Months = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type DateTimeParams = {
    year: number,
    month: Months,
    day: number,
}

export type DateTimeSpecifier = 'before' | 'since' | 'on'

export type DateTimeQuery = {
    gte?: Date,
    lt?: Date,
    lte?: Date
}

export type Scoresheet = {
    scoresheetId: string;
    target: number;
    scoresheet: Prisma.JsonValue;
    competitionId: string;
    userId: string;
    competitionName: string
    competitionDate?: Date;
    university?: string
    round?: string
}

export type SignUpSheet = {
    signUpSheetId: string;
    competitionName: string;
    participantIds: Array<string>;
    competitionDate?: Date;
    university?: string;
    round?: string;
}

export type Competition = {
    competitionId?: string;
    competitionName: string;
    competitionDate?: Date;
    university?: string;
    round?: string;
    address?: object;
    archers?: Array<string>;
    judges?: Array<string>;
    rangeMasterId?: string; // need to remove the optional constraint at some point, every Competition MUST BE HOSTED by ONE RangeMaster
    participantIds?: Array<string>;
    scoresheets?: any;
}

