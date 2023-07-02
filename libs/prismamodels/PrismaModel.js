"\nThe PrismaModel base class provides general methods to construct queries and interact with the Prisma ORM. This base class can be inherited by other classes to gain access to its private utility functions.\n";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function abstract_method(sync_or_async) {
    var _this = this;
    if (sync_or_async === 'sync') {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            throw new Error('Abstract method requires an implementation in derived classes.');
        };
    }
    else if (sync_or_async === 'async') {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new Error('Async abstract method requires an implementation in derived clases.');
                });
            });
        };
    }
}
/**
 * The `PrismaModel` abstract base class provides general methods to construct queries and interact with the Prisma ORM. This base class can be inherited by other classes to gain access to its private utility functions.
 */
var PrismaModel = /** @class */ (function () {
    // just a base utility class, set as an abstract class
    function PrismaModel() {
        var _this = this;
        // MAGIC METHODS?
        this.toString = function () {
            return "".concat(_this.constructor.name, " object. id: ").concat(_this.id);
        };
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
        /**
         * A general function that can be used to fully instantiate child classes after the corresponding records have been made in the database. The method detects the id signature in the object. Objects passed in without an `id` field are going to be ignored.
         * @param existingPrismaModel A record returned from the database with an `id` signature.
         */
        this.fullyInstantiateModel = function (existingPrismaModel) {
            if (existingPrismaModel.id !== undefined) {
                var properties = Object.keys(existingPrismaModel);
                for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                    var prop = properties_1[_i];
                    _this[prop] = existingPrismaModel[prop];
                }
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * A method to handle operations that require a full instantiation of the child classes. This is marked by the definition of an `id` signature. Throws an error if `this.id === undefined`.
         */
        this.checkIdExists = function () {
            if (_this.id === undefined) {
                throw Error('The method you are using requires a full instantiation of the object. You are seeing this error because the current instance of the object does not exist in the database. Try `this.create()` to save the current instance or instantiate the object with an existing record, carrying an `id` field.');
            }
        };
        if (this.constructor === PrismaModel) {
            throw new Error('PrismaModel is an abstract class - it cannot be directly instantiated.');
        }
    }
    // ABSTRACT METHODS
    PrismaModel.create = abstract_method('async');
    return PrismaModel;
}());
exports.default = PrismaModel;
