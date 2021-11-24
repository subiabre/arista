const terminal = require("./terminal");
const {Server, Socket} = require("socket.io");

const QueueList = require("./lists/QueueList");
const SocketList = require("./lists/SocketList");

let queue = new QueueList([]);

let clients = new SocketList([]);
let remotes = new SocketList([]);

const listen = (server) =>
{
    const io = new Server(server, { origins: '*' });

    io.on('connection', (socket) => {
        terminal.sockets.new(socket.id);

        socket.emit('server', 'hello');

        events(socket, io);
    });
}

/**
 * @param {Socket} socket
 * @param {Server} io
 */
const events = (socket, io) =>
{
    socket.on('disconnect', () => {
        terminal.sockets.out(socket.id);

        clients = clients.remove(socket);
        remotes = remotes.remove(socket);
    });

    socket.on('socket:side', side => {
        terminal.sockets.side(socket.id, side);

        switch (side) {
            case 'client':
                clients = clients.push(socket);
                break;
            case 'remote':
                remotes = remotes.push(socket);
                break;
        }
    });

    socket.on('queue:push', item => {
        queue = queue.push(item);

        io.emit('queue:update', queue.items);
    });

    socket.on('queue:play', item => {
        queue = queue.setAsPlaying(item);

        clients.emit('queue:play', item.data);
        io.emit('queue:update', queue.items);
    });

    socket.on('queue:remove', item => {
        queue = queue.remove(item);

        io.emit('queue:update', queue.items);
    });
}

module.exports = { listen };
