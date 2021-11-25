import React from "react";
import YouTube from "react-youtube";

export default class PlayerElement extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = { item: props.item };
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
        this.props.onPlay(this.player);
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
                <button onClick = {this.handlePlay.bind(this)}>Play</button>
                <YouTube
                    className = "player-hidden-iframe"
                    videoId = {this.state.item.data.id}
                    onReady = {this.handleOnReady.bind(this)}
                />
            </div>
        );
    }
}
