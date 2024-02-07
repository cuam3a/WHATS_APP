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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = require("./routers");
const database_1 = require("./config/database");
//import { Client, NoAuth, LocalAuth } from "whatsapp-web.js";
const whats_1 = require("./utils/whats");
const PORT = process.env.PORT || 9000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
var http = require("http").Server(app);
var io = require("socket.io")(http, {
    cors: { origin: "http://localhost:5173" },
});
(0, database_1.connectDB)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routers_1.router);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello World!");
}));
// const createWhatsSession = (id:any, socket:any) => {
//   const client = new Client({
//     authStrategy: new NoAuth(),
//   });
//   client.on("qr", (qr) => {
//     console.log("QR RECEIVED", qr);
//     socket.emit("qr", { qr })
//   });
//   client.on("ready", () => {
//     socket.emit("sessionReady")
//   });
//   client.on("disconnected", () => {
//     socket.emit("sessionDisconnected")
//   });
//   client.initialize();
// }
io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on("createSession", (session) => {
        const { id } = session;
        console.log();
        (0, whats_1.createWhatsSession)(id, socket);
    });
    socket.on("sendMessage", (data) => {
        console.log(data);
        (0, whats_1.sendMessage)(data, socket);
    });
    socket.on("disconnect", () => console.log(`Disconnected: ${socket.id}`));
});
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
