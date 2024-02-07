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
exports.sendMessage = exports.createWhatsSession = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const whats_model_1 = __importDefault(require("../models/whats.model"));
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.NoAuth(),
});
const createWhatsSession = (id, socket) => {
    client.on("qr", (qr) => {
        console.log("QR RECEIVED", qr);
        socket.emit("qr", { qr });
    });
    client.on("ready", () => {
        socket.emit("sessionReady");
    });
    client.on("disconnected", () => {
        socket.emit("sessionDisconnected");
    });
    client.initialize();
};
exports.createWhatsSession = createWhatsSession;
const sendMessage = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    let valueParam1 = 0;
    let valueParam2 = 0;
    let valueParam3 = 0;
    let valueParam4 = 0;
    let count = 0;
    let total = 0;
    for (var i = 0; i < data.numbers.length; i++) {
        count++;
        if (count === 10) {
            yield sleepFor(100000);
            count = 0;
        }
        let tiempo = Math.floor(Math.random() * (9000 - 3000)) + 6000;
        yield sleepFor(tiempo);
        const p1 = data.param1[valueParam1];
        const p2 = data.param2[valueParam2];
        const p3 = data.param3[valueParam3];
        const p4 = data.param4[valueParam4];
        valueParam1++;
        if (valueParam1 >= data.param1.length) {
            valueParam1 = 0;
        }
        valueParam2++;
        if (valueParam2 >= data.param2.length) {
            valueParam2 = 0;
        }
        valueParam3++;
        if (valueParam3 >= data.param3.length) {
            valueParam3 = 0;
        }
        valueParam4++;
        if (valueParam4 >= data.param4.length) {
            valueParam3 = 0;
        }
        let number = `${data.numbers[i]}@c.us`;
        const messageSend = data.message.replace('{1}', p1).replace('{2}', p2).replace('{3}', p3).replace('{4}', p4);
        var id = yield client.sendMessage(number, messageSend);
        var fecha = new Date(Date.now());
        console.log(fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getMilliseconds() + " ENVIADO A " + number + " t:" + tiempo + " ID:" + JSON.stringify(id));
        total++;
    }
    yield whats_model_1.default.create({
        total: total
    });
    socket.emit("finishSend");
});
exports.sendMessage = sendMessage;
const sleepFor = (sleepDuration) => {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {
        /* Do nothing */
    }
};
