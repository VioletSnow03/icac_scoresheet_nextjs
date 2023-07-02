"\nThe User class encapsulates async methods and fields that represent a User document within the User collection of the database.\n";
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var prismadb_1 = require("../singletons/prismadb");
var PrismaModel_1 = require("./PrismaModel");
var Scoresheet_1 = require("./Scoresheet");
var Competition_1 = require("./Competition");
/**
 * Instantiate the `User` class with a `PrismaClient` instance and `UserCredentials` retrieved from session contexts.
 * Provides an interface to get related `User` data from the database.
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    // constructor
    function User(prismaClient, userCredentials) {
        var _this = _super.call(this) || this;
        /**
         * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
         * @param when provide a search directive to retrieve `SignUpSheets` created `before | since | on` the date
         * @returns an `Array` of matching `SignUpSheet` objects or `null` if no records were found
         */
        // public getSignUpSheets = async (date?: PrismaModelTypes.DateTimeParams, when?: PrismaModelTypes.DateTimeSpecifier): Promise<PrismaModelTypes.SignUpSheet[]> => {
        // }
        /**
         * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
         * @param when provide a search directive to retrieve Scoresheets created `before | since | on` the date
         * @returns an array of matching `Scoresheet` objects or `null` if no records were found
         */
        _this.getScoresheets = function (date, when) { return __awaiter(_this, void 0, void 0, function () {
            var dateTimeQuery, userScoresheets, scoresheets;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {};
                        return [4 /*yield*/, this.prisma.user.findFirst({
                                where: {
                                    id: this.id
                                },
                                select: {
                                    scoresheets: {
                                        where: {
                                            competitionDate: __assign({}, dateTimeQuery)
                                        }
                                    }
                                }
                            })];
                    case 1:
                        userScoresheets = _b.sent();
                        scoresheets = userScoresheets === null || userScoresheets === void 0 ? void 0 : userScoresheets.scoresheets.map(function (scoresheetObj) {
                            return new Scoresheet_1.default(_this.prisma, scoresheetObj);
                        });
                        return [2 /*return*/, scoresheets];
                }
            });
        }); };
        /**
         * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
         * @param when provide a search directive to retrieve `Competitions` created `before | since | on` the date
         * @returns an array of matching `Competition` objects or `null` if no records were found
         */
        _this.getCompetitions = function (date, when) { return __awaiter(_this, void 0, void 0, function () {
            var dateTimeQuery, userCompetitions;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {};
                        return [4 /*yield*/, this.prisma.user.findFirst({
                                where: {
                                    id: this.id
                                },
                                select: {
                                    competitions: {
                                        where: {
                                            competitionDate: __assign({}, dateTimeQuery)
                                        }
                                    }
                                }
                            })];
                    case 1:
                        userCompetitions = _b.sent();
                        if (userCompetitions !== null) {
                            return [2 /*return*/, userCompetitions.competitions.map(function (competition) { return new Competition_1.default(_this.prisma, competition); })];
                        }
                        else {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.prisma = prismaClient;
        _this.fullyInstantiateModel(userCredentials);
        // remove password
        delete _this.passwordHash;
        return _this;
    }
    var _a;
    _a = User;
    /**
     * A static method to create new users.
     * @param prismaClient An instance of the `PrismaClient` object.
     * @param userCredentials A `UserCreateInput` object created by forms submitted from the frontend.
     * @param instantiate Set to `true` to return an instance of the `User` class or `false` to return the `UserCredentials` object.
     * @returns `UserCredentials | User instance | error` depending on the success of the operation and `instantiate` parameter.
     */
    User.create = function (prismaClient, userCredentials, instantiate) {
        if (instantiate === void 0) { instantiate = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            var newUser, error_1;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prismaClient.user.create({
                                data: userCredentials
                            })];
                    case 1:
                        newUser = _b.sent();
                        if (instantiate) {
                            return [2 /*return*/, new User(prismaClient, newUser)];
                        }
                        else if (!instantiate) {
                            return [2 /*return*/, newUser];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, error_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}(PrismaModel_1.default));
exports.default = User;
function getUser() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, prismadb_1.prisma.user.findFirst({
                        where: {
                            firstName: "Tristan",
                            lastName: "Lim"
                        }
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
// testing enviroment
if (require.main === module) {
    // const bcrypt = require('bcrypt')
    // immediately calls async function to avoid callback hell
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var userCreds, user, scoresheets, _i, scoresheets_1, scoresheet;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getUser()];
                case 1:
                    userCreds = _b.sent();
                    console.log(userCreds);
                    user = new User(prismadb_1.prisma, userCreds);
                    return [4 /*yield*/, user.getScoresheets()];
                case 2:
                    scoresheets = _b.sent();
                    if (scoresheets !== undefined) {
                        for (_i = 0, scoresheets_1 = scoresheets; _i < scoresheets_1.length; _i++) {
                            scoresheet = scoresheets_1[_i];
                            console.log(scoresheet.scoresheet);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
