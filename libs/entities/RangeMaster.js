"\nThe RangeMaster class encapsulates async methods to create and manage competitions.\n";
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
var prismadb_1 = require("../prismadb");
var Entity_1 = require("./Entity");
var RangeMaster = /** @class */ (function (_super) {
    __extends(RangeMaster, _super);
    function RangeMaster(prismaClient, rangeMasterCredentials) {
        var _this = _super.call(this) || this;
        /**
         * @param competition A `Competition` object detailing at least the required fields to create a `Competition`.
         * @returns `true` if the `Competition` was successfully created, otherwise returns the `error` object for handling
         */
        _this.createCompetition = function (competition) { return __awaiter(_this, void 0, void 0, function () {
            var createCompetitionResponse, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        competition.rangeMasterId = this.credentials.rangeMasterId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prismadb_1.prisma.competition.create({
                                data: __assign({}, competition)
                            })];
                    case 2:
                        createCompetitionResponse = _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        error_1 = _a.sent();
                        // if create fails, return the error
                        return [2 /*return*/, error_1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * @param date provide date as an object of `numbers` specifying the `{year, month, day}`
         * @param when provide a search directive to retrieve `Competitions` created `before | since | on` the date
         * @returns an array of matching `Competition` objects or `null` if no records were found
         */
        _this.getCompetitions = function (date, when) { return __awaiter(_this, void 0, void 0, function () {
            var dateTimeQuery, competitions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dateTimeQuery = date && when !== undefined ? this.generateDateQuery(date, when) : {};
                        return [4 /*yield*/, prismadb_1.prisma.rangeMaster.findFirst({
                                where: {
                                    rangeMasterId: this.credentials.rangeMasterId
                                },
                                select: {
                                    competitionsHosted: {
                                        where: {
                                            competitionDate: __assign({}, dateTimeQuery)
                                        }
                                    }
                                }
                            })];
                    case 1:
                        competitions = _a.sent();
                        return [2 /*return*/, competitions.competitionsHosted];
                }
            });
        }); };
        _this.prisma = prismaClient;
        _this.credentials = rangeMasterCredentials;
        return _this;
    }
    return RangeMaster;
}(Entity_1.default));
if (require.main === module) {
    var competition_1 = {
        competitionName: 'SEAL 2023 Spring',
        university: 'Imperial College London',
        competitionDate: new Date(2024, 2, 20),
        address: {
            addressLine1: 'Ethos Sports Centre'
        }
    };
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var rangeMasterCreds, rangeMaster, competitions, competitionCreated, moreCompetitions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismadb_1.prisma.rangeMaster.findFirst({
                        where: {
                            clubName: 'Imperial College Archery Club'
                        }
                    })];
                case 1:
                    rangeMasterCreds = _a.sent();
                    rangeMaster = new RangeMaster(prismadb_1.prisma, rangeMasterCreds);
                    return [4 /*yield*/, rangeMaster.getCompetitions()];
                case 2:
                    competitions = _a.sent();
                    console.log('before creating: ', competitions);
                    return [4 /*yield*/, rangeMaster.createCompetition(competition_1)];
                case 3:
                    competitionCreated = _a.sent();
                    return [4 /*yield*/, rangeMaster.getCompetitions()];
                case 4:
                    moreCompetitions = _a.sent();
                    if (competitionCreated === true) {
                        console.log('after creating: ', moreCompetitions);
                    }
                    else {
                        console.log('creating competition error: ', competitionCreated);
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
