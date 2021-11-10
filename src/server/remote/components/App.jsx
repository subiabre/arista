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
     * @param {Socket} socket 
     */
    handleSocketEvents(socket)
    {
        socket.on('server', data => {
            socket.emit('socket:side', 'remote');
        });
    }

    render()
    {
        return (
            <h1>Remote</h1>
        );
    }
}
