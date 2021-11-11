const {Server, Socket} = require("socket.io");
const terminal = require("./terminal");

const sockets = { remote: [], client: [] };

const listen = (server) =>
{
    const io = new Server(server, { origins: '*' });

    io.on('connection', (socket) => {
        terminal.writeInfoLine(`[Sockets] new: ${socket.id}`);

        socket.emit('server', 'hello');

        events(socket);
    });
}

/**
 * @param {Array} array 
 * @param {Socket} item 
 * @returns 
 */
const push = (array, item) =>
{
    return [...array, item];
}

/**
 * @param {Array} array 
 * @param {Socket} item 
 * @returns 
 */
const remove = (array, item) =>
{
    const pos = array.indexOf(item);

    if (pos < 0) return array;

    return [...array.slice(0, pos - 1), ...array.slice(pos + 1)];
}

/**
 * @param {Socket} socket 
 */
const events = (socket) =>
{
    socket.on('disconnect', () => {
        terminal.writeInfoLine(`[Sockets] out: ${socket.id}`);

        sockets.client = remove(sockets.client, socket);
        sockets.remote = remove(sockets.remote, socket);
    });

    socket.on('socket:side', type => {
        terminal.writeInfoLine(`[Sockets] side:${type}: ${socket.id}`);

        sockets[type] = push(sockets[type], socket);
    });
}

module.exports = { listen };
