import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", socket => {
    console.log(socket);
})

// const temp_sockets = [];
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// wss.on("connection", (socket) => {
//     temp_sockets.push(socket);
//     socket["nickname"] = "Anon";
//     console.log("Connected to browser.");
//     socket.on("close", () => {
//         console.log("Disconnected from the browser.");
//     });
//     socket.on("message", (msg) => {
//         const parsed_msg = JSON.parse(msg);
//         switch (parsed_msg.type) {
//             case "new_message":
//                 temp_sockets.forEach((_socket) => {
//                     _socket.send(`${socket.nickname}: ${parsed_msg.payload}`);
//                 });
//                 break;
//             case "nickname":
//                 socket["nickname"] = parsed_msg.payload;
//                 break;
//         }
//     });
// });

httpServer.listen(3000, handleListen);
