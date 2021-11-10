import React from "react";
import getSocketClient, { Socket } from "socket.io-client";

import address from "../../../modules/address";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        const socket = getSocketClient(address.get());

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
        });
    }

    render()
    {
        return (
            <h1>Client</h1>
        );
    }
}
