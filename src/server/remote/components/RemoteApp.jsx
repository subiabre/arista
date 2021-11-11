import React from "react";
import getSocketClient, { Socket } from "socket.io-client";
import axios from "axios";

import address from "../../../modules/address";
import SearchElement from "./SearchElement";
import ResultsElement from "./ResultsElement";
import ResultsItem from "./ResultsItem";

export default class RemoteApp extends React.Component
{
    constructor(props)
    {
        super(props);
        const socket = getSocketClient(address.get());

        this.state = { searchResults: [] };

        this.socket = socket;
        this.handleSocketEvents(socket);

        this.setState = this.setState.bind(this);
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

    /**
     * @param {Event} event 
     */
    submitSearch(event)
    {
        event.preventDefault();

        const query = event.target.firstChild.value;

        axios.get(address.youtube(query))
            .then(result => this.setState({ searchResults: result.data.result.items }))
            .catch(error => console.log(error))
            ;
    }

    render()
    {
        return (
            <div>
                <SearchElement 
                    onInput = {() => {}}
                    onSubmit = {this.submitSearch.bind(this)}
                />
                <ResultsElement 
                    results = {this.state.searchResults}
                />
            </div>
        );
    }
}
