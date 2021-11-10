const {Server, Socket} = require("socket.io");
const terminal = require("./terminal");

const sockets = { remote: [], client: [] };

const listen = (server) =>
{
    const io = new Server(server, { origins: '*' });

    io.on('connection', (socket) => {
        terminal.writeInfoLine(`New socket connected: ${socket.id}`);

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
        terminal.writeInfoLine(`Socket ${socket.id} disconnected`);

        sockets.client = remove(sockets.client, socket);
        sockets.remote = remove(sockets.remote, socket);
    });

    socket.on('socket:side', type => {
        terminal.writeInfoLine(`Socket ${socket.id} is on ${type} side`);

        sockets[type] = push(sockets[type], socket);
    });
}

module.exports = { listen };
