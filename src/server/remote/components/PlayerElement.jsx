import React from "react";
import YouTube from "react-youtube";
import PlayPauseButton from "./player/PlayPauseButton";

export default class PlayerElement extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = { item: props.item };
    }

    compressPlayerInfo(player)
    {
        return {
            time: player.getCurrentTime(),
            volume: player.getVolume()
        };
    }

    shouldComponentUpdate(nextProps)
    {
        return nextProps.item.queueId !== this.state.item.queueId;
    }

    componentDidUpdate(props)
    {
        this.setState({ item: props.item });
    }

    handlePlay(event)
    {
        this.props.onPlay(this.player, this.compressPlayerInfo(this.player));
    }

    handlePause(event)
    {
        this.props.onPause(this.player, this.compressPlayerInfo(this.player));
    }

    handleOnReady(event)
    {
        this.player = event.target;

        event.target.setVolume(0);
    }

    render()
    {
        return (
            <div className = "player">
                <span>{this.state.item.data.title}</span>
                
                <PlayPauseButton
                    setPlay = {this.handlePlay.bind(this)}
                    setPause = {this.handlePause.bind(this)}
                />
                
                <YouTube
                    className = "player-hidden-iframe"
                    videoId = {this.state.item.data.id}
                    onReady = {this.handleOnReady.bind(this)}
                />
            </div>
        );
    }
}
