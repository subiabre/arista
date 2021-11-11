const {Server, Socket} = require("socket.io");
const terminal = require("./terminal");

const createSocketList = (array) => {
    const list = new Object();

    list.array = array;
    list.push = (item) => list.array = push(list.array, item);
    list.remove = (item) => list.array = remove(list.array, item);

    return list;
}

const createQueueList = (array) => { 
    const list = new Object();

    list.array = array;
    list.push = (item) => list.array = push(list.array, { queueId: new Date().getTime(), data: item.item });
    list.indexOf = (item) => list.array.indexOf(list.array.filter((i) => i.queueId === item.queueId)[0]);
    list.remove = (item) => {
        const pos = list.indexOf(item); 
        list.array = [...list.array.slice(0, pos), ...list.array.slice(pos + 1)]
    };

    return list;
}

const clients = createSocketList([]);
const remotes = createSocketList([]);
const queue = createQueueList([]);

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

    return [...array.slice(0, pos), ...array.slice(pos + 1)];
}

const listen = (server) =>
{
    const io = new Server(server, { origins: '*' });

    io.on('connection', (socket) => {
        terminal.writeInfoLine(`[Sockets] new: ${socket.id}`);

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
        terminal.writeInfoLine(`[Sockets] out: ${socket.id}`);

        clients.remove(socket);
        remotes.remove(socket);
    });

    socket.on('socket:side', type => {
        terminal.writeInfoLine(`[Sockets] side:${type}: ${socket.id}`);

        switch (type) {
            case 'client':
                clients.push(socket);
                break;
            case 'remote':
                remotes.push(socket);
                break;
        }
    });

    socket.on('queue:push', item => {
        queue.push(item);

        io.emit('queue:update', queue.array);
    });

    socket.on('queue:remove', item => {
        queue.remove(item);

        io.emit('queue:update', queue.array);
    });
}

module.exports = { listen };
