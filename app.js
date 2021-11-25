require("dotenv").config();

const ip = require("get-ip-addresses").default();

const http = require("http");
const path = require("path");

const express = require("express");
const arista = express();

const address = require("./src/modules/address");
const youtube = require("./src/modules/youtube");
const sockets = require("./src/modules/sockets");
const terminal = require("./src/modules/terminal");

const server = http.createServer(arista);

arista.use('/dist', express.static(path.join(__dirname, 'dist')));

arista.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'server', 'remote', 'index.html'));
});

arista.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'server', 'client', 'index.html'));
});

server.listen(address.port, () => {
    terminal.info(`Remote at \n${address.getServer()}\nhttp://${ip}:${address.port}`);
    terminal.info(`Client at \n${address.getClient()}\nhttp://${ip}:${address.port}/client`);
});

youtube.routes(arista);
sockets.listen(server);
