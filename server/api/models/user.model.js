"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        required: true,
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    rol: {
        type: String,
        enum: ["ADMIN", "USUARIO"],
        required: true,
    },
    status: {
        type: String,
        enum: ["ACTIVO", "INACTIVO", "ELIMINADO"],
        required: true,
    },
}, {
    versionKey: false,
    timestamps: {
        currentTime: () => {
            let date = new Date();
            let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 * -1);
            return newDate;
        },
    },
});
const UserModel = (0, mongoose_1.model)("user", UserSchema);
exports.default = UserModel;
