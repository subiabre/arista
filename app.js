require("dotenv").config();

const http = require("http");
const path = require("path");

const express = require("express");
const pyramid = express();

const address = require("./src/modules/address");
const youtube = require("./src/modules/youtube");
const sockets = require("./src/modules/sockets");
const terminal = require("./src/modules/terminal");

const server = http.createServer(pyramid);

pyramid.use('/dist', express.static(path.join(__dirname, 'dist')));

pyramid.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'server', 'remote', 'index.html'));
});

pyramid.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'server', 'client', 'index.html'));
});

server.listen(address.port, () => {
    terminal.info(`Remote at ${address.getServer()}`);
    terminal.info(`Client at ${address.getClient()}`);
});

youtube.routes(pyramid);
sockets.listen(server);
