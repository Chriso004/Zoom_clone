import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`listening on https://localhost:3000`);
app.listen(3000, handleListen);

const server = http.createServer(app);
const ws_server = new WebSocket.Server( {server} );