import React from "react";
import YouTube from "react-youtube";
import getSocketClient, { Socket } from "socket.io-client";

import address from "../../../modules/address";

export default class ClientApp extends React.Component
{
    constructor(props)
    {
        super(props);
        const socket = getSocketClient(address.getServer());

        this.state = { playing: { id: null }, player: null }

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
        });

        socket.on('queue:play', data => {
            this.setState({ playing: data });
        });

        socket.on('player:play', data => {
            this.player.playVideo();
        });

        socket.on('player:pause', data => {
            this.player.pauseVideo();
        });

        socket.on('player:volume', data => {
            this.player.setVolume(data.volume);
        });

        socket.on('player:time', data => {
            this.player.seekTo(data.time);
        })
    }

    handlePlayerReady(event)
    {
        this.socket.emit('client:ready', this.socket.id);

        this.player = event.target;
    }

    render()
    {
        return (
            <div>
                <YouTube
                    videoId = {this.state.playing.id}
                    onReady = {this.handlePlayerReady.bind(this)}
                    opts = {{
                        playerVars: {
                            controls: 0,
                            disablekb: 1,
                            modestbranding: 1
                        }
                    }}
                />
            </div>
        );
    }
}
