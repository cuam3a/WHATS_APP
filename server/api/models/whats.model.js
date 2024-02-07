"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WhatsSchema = new mongoose_1.Schema({
    total: {
        type: Number,
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
const WhatsModel = (0, mongoose_1.model)("whats", WhatsSchema);
exports.default = WhatsModel;
