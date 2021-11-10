import React from "react";
import getSocketClient from "socket.io-client";

import address from "../../../modules/address";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        const socket = getSocketClient(address.get());

        this.handleSocketEvents(socket);
    }

    handleSocketEvents(socket)
    {
        socket.on('server', data => {
            console.log(data);
        });
    }

    render()
    {
        return (
            <h1>Client</h1>
        );
    }
}
