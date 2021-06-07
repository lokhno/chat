import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";

import { RoomRoutes, MessageRoutes } from "./routes/index.js";
var app = express();
const server = http.createServer(app, { cors: { origin: "*" } });
const io = new Server(server, { cors: { origin: "*" } });

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});
var mongoDB = "mongodb://localhost:27017/my_chat";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

MessageRoutes(app, io);
RoomRoutes(app, io);

io.on("connection", (socket) => {
    console.log("a user connected");
});

server.listen(3001, () => {
    console.log("listening on *:3001");
});
