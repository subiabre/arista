import React from "react";
import getSocketClient, { Socket } from "socket.io-client";

import address from "../../../modules/address";

export default class ClientApp extends React.Component
{
    constructor(props)
    {
        super(props);
        const socket = getSocketClient(address.getServer());

        this.state = { playing: { url: '' } }

        this.socket = socket;
        this.handleSocketEvents(socket);
    }

    /**
     * Dispatch the events for this component socket
     * @param {Socket} socket 
     */
    handleSocketEvents(socket)
    {

        socket.on('server', data => {
            socket.emit('socket:side', 'client');
            socket.emit('client:ready', this.socket.id);
        });

        socket.on('queue:play', data => {
            this.setState({ playing: data });
        });
    }

    render()
    {
        return (
            <div>
                {this.state.playing.url}
            </div>
        );
    }
}
