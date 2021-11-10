require("dotenv").config();

const http = require("http");
const path = require("path");
const addr = require("./src/modules/address");

const express = require("express");
const pyramid = express();

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

server.listen(addr.port, () => {
    terminal.writeInfoLine(`Remote at ${addr.get()}`);
    terminal.writeInfoLine(`Client at ${addr.get()}/client`);
});

sockets.listen(server);
