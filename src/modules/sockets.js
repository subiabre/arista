const {Server} = require("socket.io");
const terminal = require("./terminal");

function listen(server)
{
    const io = new Server(server, { origins: '*' });

    io.on('connection', (socket) => {
        terminal.writeInfoLine(`New socket connected: ${socket.id}`);

        socket.emit('server', 'hello');
    });
}

module.exports = { listen };
