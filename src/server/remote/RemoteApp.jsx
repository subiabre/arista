import React from "react";
import getSocketClient, { Socket } from "socket.io-client";
import axios from "axios";

import address from "../../modules/address";

import SearchElement from "./components/SearchElement";
import ResultsList from "./components/ResultsList";
import QueueList from "./components/QueueList";

import "./Remote.css";
import PlayerElement from "./components/PlayerElement";

export default class RemoteApp extends React.Component
{
    constructor(props)
    {
        super(props);
        const socket = getSocketClient(address.getServer());

        this.state = { searchResults: [], queueItems: [], playerItem: { data: { id: '', title: 'none' } } };

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

        socket.on('queue:update', data => {
            this.setState({ queueItems: data });
        });

        socket.on('player:ready', player => {
            console.log('player is ready');
        });
    }

    /**
     * @param {Event} event 
     */
    submitSearch(event)
    {
        event.preventDefault();

        const query = event.target.firstChild.value;

        axios.get(address.getYoutube(query))
            .then(result => this.setState({ searchResults: result.data.result.items }))
            .catch(error => console.log(error))
            ;
    }

    sendItemToQueue(item)
    {
        this.socket.emit('queue:push', item);
    }

    playItemFromQueue(item)
    {
        this.setState({ playerItem: item });

        this.socket.emit('queue:play', item);
    }

    removeItemFromQueue(item)
    {
        this.socket.emit('queue:remove', item);
    }

    playItemInPlayer(player)
    {
        this.socket.emit('player:play');

        player.playVideo();
    }

    render()
    {
        return (
            <div>
                <SearchElement 
                    onInput = {() => {}}
                    onSubmit = {this.submitSearch.bind(this)}
                />
                <div className = "lists" >
                    <ResultsList
                        results = {this.state.searchResults}
                        onItemClick = {this.sendItemToQueue.bind(this)}
                    />
                    <QueueList
                        items = {this.state.queueItems}
                        onItemClick = {this.playItemFromQueue.bind(this)}
                    />
                </div>
                <PlayerElement
                    item = {this.state.playerItem}
                    onPlay = {this.playItemInPlayer.bind(this)}
                />
            </div>
        );
    }
}
