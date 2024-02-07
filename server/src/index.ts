import express from "express";
import cors from "cors";
import { router } from "./routers";
import { connectDB } from "./config/database";
//import { Client, NoAuth, LocalAuth } from "whatsapp-web.js";
import { createWhatsSession, sendMessage } from "./utils/whats";
import { Message } from "../../types/types";

const PORT = process.env.PORT || 9000;

const app = express();
app.use(cors());
var http = require("http").Server(app);
var io = require("socket.io")(http, {
  cors: { origin: "http://localhost:5173" },
});

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

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


io.on("connection", (socket: any) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("createSession", (session: any) => {
    const {id} = session;
    console.log()
    createWhatsSession(id, socket);
  })

  socket.on("sendMessage", (data: Message) => {
    console.log(data)
    sendMessage(data, socket);
  })

  socket.on("disconnect", () => console.log(`Disconnected: ${socket.id}`));
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
