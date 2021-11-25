const { Socket } = require("socket.io");

module.exports = class SocketList
{
    constructor(sockets = []) {
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
     * Update a Socket in the array
     * @param {Socket} outdated The socket to update
     * @param {Socket} updated The socket to replace the original object
     * @returns {SocketList}
     */
    update(outdated, updated)
    {
        const pos = this.indexOf(outdated);

        return new SocketList([
            ...this.sockets.slice(0, pos),
            updated,
            ...this.sockets.slice(pos + 1)
        ]);
    }

    /**
     * Update a Socket as ready to play
     * @param {Socket} socket
     * @param {Boolean} ready
     * @returns {SocketList}
     */
    setAsReady(socket, ready = true)
    {
        socket.isPlaybackReady = ready;

        return this.update(socket, socket);
    }

    /**
     * Check if all the sockets in the array are ready
     * @returns {Boolean}
     */
    hasAllReady()
    {
        for (let index = 0; index < this.sockets.length; index++) {
            const current = this.sockets[index];
            
            if (!current.hasOwnProperty('isPlaybackReady')) return false;
            if (!current.isPlaybackReady) return false;
            
            return true; 
        }
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
