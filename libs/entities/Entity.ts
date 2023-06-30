`
The Entity base class provides general methods to construct queries and interact with the Prisma ORM. This base class can be inherited by other classes to gain access to its private utility functions.
`

import * as EntityTypes from './types/entity_types'

/**
 * The `Entity` base class provides general methods to construct queries and interact with the Prisma ORM. This base class can be inherited by other classes to gain access to its private utility functions.
 */
export default class Entity {

    // just a base utility class, no constructor needed
    constructor () {}

    /**
     * @param date A `DateTimeParams` object specifying the `{year, month, day}` for the query.
     * @param when A `DateTimeSpecifier` to determine whether to look for records `before | since | on` the provided `date`
     * @returns 
     */
    protected generateDateQuery = (date: EntityTypes.DateTimeParams, when: EntityTypes.DateTimeSpecifier): EntityTypes.DateTimeQuery => {

        const queriedDate = new Date(date.year, date.month, date.day)
        const tomorrowDate = new Date(queriedDate.getDate() + 1) // get tomorrow's date

        const dateQuery: EntityTypes.DateTimeQuery = {}
        
        // adjust query according to `when` parameter
        switch (when) {
            case 'on':
                dateQuery.gte = queriedDate
                dateQuery.lt = tomorrowDate
                return dateQuery
            case 'since':
                dateQuery.gte = queriedDate
                return dateQuery
            case 'before':
                dateQuery.lte = queriedDate
                return dateQuery
        }

    }

}