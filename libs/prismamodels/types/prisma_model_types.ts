import { Prisma } from "@prisma/client"

export interface UserCredentials {
    id?: string
    username: string
    firstName: string
    lastName: string
    university: string
    email: string
}

export interface RangeMasterCredentials {
    id?: string
    university: string
    clubName: string
    email: string
    signUpDate: Date
}

export type Months = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface DateTimeParams {
    year: number;
    month: Months;
    day: number;
}

export type DateTimeSpecifier = 'before' | 'since' | 'on'

export type DateTimeQuery = {
    gte?: Date,
    lt?: Date,
    lte?: Date
}

// export type Scoresheet = {
//     id?: string;
//     target: number;
//     scoresheet: Prisma.InputJsonValue;
//     competitionId: string;
//     userId: string;
//     competitionName: string
//     competitionDate?: Date;
//     university?: string | null
//     round?: string | null
// }

// export type SignUpSheet = {
//     id?: string;
//     competitionName: string;
//     participantIds: Array<string>;
//     competitionDate?: Date;
//     university?: string | null;
//     round?: string | null;
// }

// export type Competition = {
//     id?: string;
//     competitionName: string;
//     competitionDate?: Date | null;
//     university?: string | null;
//     round?: string | null;
//     address?: Prisma.InputJsonValue;
//     archers?: Array<string>;
//     judges?: Array<string>;
//     rangeMasterId?: string | null; // need to remove the optional constraint at some point, every Competition MUST BE HOSTED by ONE RangeMaster
//     participantIds?: Array<string>;
//     scoresheets?: any;
// }

export interface ScoresheetRecord { 
    id?: string | null; 
    target: number; 
    scoresheet: Prisma.JsonValue; 
    competitionName: string; 
    competitionDate?: Date | null; 
    university?: string | null; 
    round: string; 
    competitionId: string; 
    userId: string; 
}

export interface CompetitionRecord {
    id?: string | undefined;
    competitionName: string;
    competitionDate?: Date | null;
    university?: string | null;
    round?: string | null;
    address: Prisma.JsonValue;
    archers: string[];
    judges: string[];
    rangeMasterId?: string | null;
    participantIds: string[];
}

export interface RangeMasterRecord {
    id: string;
    university: string;
    clubName: string;
    email: string;
    passwordHash: string;
    signUpDate: Date;
}

