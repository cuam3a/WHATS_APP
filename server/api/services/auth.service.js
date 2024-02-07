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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcypt_handle_1 = require("../utils/bcypt.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const loginService = ({ user, password }) => __awaiter(void 0, void 0, void 0, function* () {
    if (user == "" || password == "" || user == null || password == null)
        throw Error("USER OR PASSWORD INCORRECT");
    let checkIs = yield user_model_1.default.findOne({
        user: user.trim().toUpperCase(),
        status: "ACTIVO",
    });
    if (!checkIs || checkIs == null)
        throw Error("USER OR PASSWORD INCORRECT");
    const passwordHash = checkIs.password;
    const isCorrect = yield (0, bcypt_handle_1.verified)(password !== null && password !== void 0 ? password : "", passwordHash);
    if (!isCorrect)
        throw Error("USER OR PASSWORD INCORRECT");
    const token = (0, jwt_handle_1.generateToken)(`${checkIs._id}`);
    return token;
});
exports.loginService = loginService;
