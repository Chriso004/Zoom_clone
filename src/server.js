import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`listening on http://localhost:3000`);

const server = http.createServer(app);
const wsServer = new WebSocket.Server( {server} );

const sockets = []

// socket은 서버와 연결된 브라우저
wsServer.on("connection", (socket) => {
    sockets.push(socket);
    console.log("connected");
    socket.on("message", (message) => {
        sockets.forEach((aSocket) => aSocket.send(message.toString()));
    })
});

server.listen(3000, handleListen);
