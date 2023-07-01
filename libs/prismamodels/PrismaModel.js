"\nThe Entity base class provides general methods to construct queries and interact with the Prisma ORM. This base class can be inherited by other classes to gain access to its private utility functions.\n";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The `Entity` base class provides general methods to construct queries and interact with the Prisma ORM. This base class can be inherited by other classes to gain access to its private utility functions.
 */
var PrismaModel = /** @class */ (function () {
    // just a base utility class, no constructor needed
    function PrismaModel() {
        /**
         * @param date A `DateTimeParams` object specifying the `{year, month, day}` for the query.
         * @param when A `DateTimeSpecifier` to determine whether to look for records `before | since | on` the provided `date`
         * @returns
         */
        this.generateDateQuery = function (date, when) {
            var queriedDate = new Date(date.year, date.month, date.day);
            var tomorrowDate = new Date(queriedDate.getDate() + 1); // get tomorrow's date
            var dateQuery = {};
            // adjust query according to `when` parameter
            switch (when) {
                case 'on':
                    dateQuery.gte = queriedDate;
                    dateQuery.lt = tomorrowDate;
                    return dateQuery;
                case 'since':
                    dateQuery.gte = queriedDate;
                    return dateQuery;
                case 'before':
                    dateQuery.lte = queriedDate;
                    return dateQuery;
            }
        };
    }
    return PrismaModel;
}());
exports.default = PrismaModel;
