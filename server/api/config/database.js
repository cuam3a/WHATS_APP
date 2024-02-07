"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const connectDB = () => {
    try {
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.connect(process.env.MONGO_DB || '').then(() => { });
        console.log("Mongo Connected");
    }
    catch (error) {
        console.log("Mongo Connected Error:" + error);
    }
};
exports.connectDB = connectDB;
