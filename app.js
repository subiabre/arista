require("dotenv").config();

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
    terminal.info(`Remote at ${address.getServer()}`);
    terminal.info(`Client at ${address.getClient()}`);
});

youtube.routes(arista);
sockets.listen(server);
