const { Socket } = require("socket.io");

module.exports = class SocketList
{
    constructor(sockets = [])
    {
        /**
         * The internal objects
         * @type {Array <Socket>}
         */
        this.sockets = sockets;
    }

    /**
     * Get the position of any socket in the array
     * @param {Socket} socket 
     * @returns {Number}
     */
    indexOf(socket)
    {
        return this.sockets.indexOf(socket);
    }

    /**
     * Add a Socket to the array
     * @param {Socket} socket 
     * @returns {SocketList}
     */
    push(socket)
    {
        return new SocketList([...this.sockets, socket]);
    }

    /**
     * Remove a Socket from the array
     * @param {Socket} socket 
     * @returns {SocketList}
     */
    remove(socket)
    {
        const pos = this.indexOf(socket);

        return new SocketList([
            ...this.sockets.slice(0, pos),
            ...this.sockets.slice(pos + 1)
        ]);
    }

    /**
     * Emit an event to all the sockets in this list
     * @param {String} channel 
     * @param payload 
     */
    emit(channel, payload)
    {
        this.sockets.forEach((socket) => socket.emit(channel, payload));
    }
}
