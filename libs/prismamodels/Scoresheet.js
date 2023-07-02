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
var PrismaModel_1 = require("./PrismaModel");
/**
 * The `Scoresheet` class encapsulates methods to build and create scoresheets.
 */
var Scoresheet = /** @class */ (function (_super) {
    __extends(Scoresheet, _super);
    function Scoresheet(prismaClient, scoresheetRecord) {
        var _this = _super.call(this) || this;
        /**
         * Synchronizes `Scoresheet` record in the database with the current instance.
         */
        _this.save = function () { return __awaiter(_this, void 0, void 0, function () {
            var saveResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.checkIdExists();
                        return [4 /*yield*/, this.prisma.scoresheet.update({
                                where: {
                                    id: this.id
                                },
                                data: {
                                    scoresheet: this.scoresheet
                                }
                            })];
                    case 1:
                        saveResponse = _b.sent();
                        return [2 /*return*/, saveResponse];
                }
            });
        }); };
        /**
         * Formats the existing `Scoresheet` to the specified round.
         */
        _this.setRound = function (roundName, overwrite) {
            if (overwrite === void 0) { overwrite = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var roundFormat;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // check if there is already a scoresheet set, raise a warning if so
                            if (this.scoresheet !== undefined && !overwrite) {
                                throw new Error("The current scoresheet has been initialized with a ".concat(this.round));
                            }
                            return [4 /*yield*/, this.prisma.round.findFirst({
                                    where: {
                                        round: roundName
                                    },
                                    select: {
                                        scoresheetFormat: true
                                    }
                                })];
                        case 1:
                            roundFormat = _b.sent();
                            this.scoresheet;
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.prisma = prismaClient;
        _this.fullyInstantiateModel(scoresheetRecord);
        return _this;
    }
    var _a;
    _a = Scoresheet;
    /**
     * A static method to create new scoresheets.
     * @param prismaClient An instance of the `PrismaClient` object.
     * @param scoresheet A `Prisma.ScoresheetCreateInput` object created by forms submitted from the frontend.
     * @param instantiate Set to `true` to return an instance of the `Scoresheet` class or `false` to return the `ScoresheetRecord` object.
     * @returns `Scoresheet | ScoresheetRecord | error` depending on the success of the operation and `instantiate` parameter.
     */
    Scoresheet.create = function (prismaClient, scoresheet, instantiate) {
        if (instantiate === void 0) { instantiate = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            var scoresheetRecord, error_1;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prismaClient.scoresheet.create({
                                data: scoresheet
                            })];
                    case 1:
                        scoresheetRecord = _b.sent();
                        if (instantiate) {
                            return [2 /*return*/, new Scoresheet(prismaClient, scoresheetRecord)];
                        }
                        else if (!instantiate) {
                            return [2 /*return*/, scoresheetRecord];
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
    return Scoresheet;
}(PrismaModel_1.default));
exports.default = Scoresheet;
if (require.main === module) {
    var scoresheetObj = {
        target: 2,
        competitionId: '649d66bb15f64e0894a91cf9',
        userId: '649d57c4f0c24266910e1480',
        competitionName: 'SEAL 2023',
        round: 'Porstmouth',
        scoresheet: {
            dummyScores: [
                [10, 10, 10],
                [9, 10, 10],
                [9, 10, 9],
            ]
        }
    };
}
