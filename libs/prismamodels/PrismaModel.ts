`
The PrismaModel base class provides general methods to construct queries and interact with the Prisma ORM. This base class can be inherited by other classes to gain access to its private utility functions.
`

import * as PrismaModelTypes from './types/prisma_model_types'

  
function abstract_method (sync_or_async: 'sync' | 'async') {

    if (sync_or_async === 'sync') {
        return (...args: any[]): any => {
            throw new Error('Abstract method requires an implementation in derived classes.')
        }
    } else if (sync_or_async === 'async') {
        return async (...args: any[]): Promise<any> => {
            throw new Error('Async abstract method requires an implementation in derived clases.')
        }
    }

}

/**
 * The `PrismaModel` abstract base class provides general methods to construct queries and interact with the Prisma ORM. This base class can be inherited by other classes to gain access to its private utility functions.
 */
export default class PrismaModel {

    // attributes can be anything the child classes implement
    [key: string]: any;

    // just a base utility class, set as an abstract class
    constructor () {
        if (this.constructor === PrismaModel) {
            throw new Error('PrismaModel is an abstract class - it cannot be directly instantiated.')
        }
    }

    // ABSTRACT METHODS
    public static create = abstract_method('async')


    // MAGIC METHODS?
    toString = () => {
        return `${this.constructor.name} object. id: ${this.id}`
    }

    /**
     * @param date A `DateTimeParams` object specifying the `{year, month, day}` for the query.
     * @param when A `DateTimeSpecifier` to determine whether to look for records `before | since | on` the provided `date`
     * @returns 
     */
    protected generateDateQuery = (date: PrismaModelTypes.DateTimeParams, when: PrismaModelTypes.DateTimeSpecifier): PrismaModelTypes.DateTimeQuery => {

        const queriedDate = new Date(date.year, date.month, date.day)
        const tomorrowDate = new Date(queriedDate.getDate() + 1) // get tomorrow's date

        const dateQuery: PrismaModelTypes.DateTimeQuery = {}
        
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

    /**
     * A general function that can be used to fully instantiate child classes after the corresponding records have been made in the database. The method detects the id signature in the object. Objects passed in without an `id` field are going to be ignored.
     * @param existingPrismaModel A record returned from the database with an `id` signature.
     */
    protected fullyInstantiateModel = (existingPrismaModel: any) => {

        if (existingPrismaModel.id !== undefined) {
            const properties = Object.keys(existingPrismaModel)
            
            for (const prop of properties) {
                this[prop] = existingPrismaModel[prop]
            }

            return true
        } else {
            return false
        }

    }

    /**
     * A method to handle operations that require a full instantiation of the child classes. This is marked by the definition of an `id` signature. Throws an error if `this.id === undefined`.
     */
    protected checkIdExists = () => {
        if (this.id === undefined) {
            throw Error('The method you are using requires a full instantiation of the object. You are seeing this error because the current instance of the object does not exist in the database. Try `this.create()` to save the current instance or instantiate the object with an existing record, carrying an `id` field.')
        }
    }

}