import React from "react";
import YouTube from "react-youtube";
import PlayPauseButton from "./player/PlayPauseButton";
import TimeSlider from "./player/TimeSlider";
import VolumeSlider from "./player/VolumeSlider";

export default class PlayerElement extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            currentTime: 0,
            isPlaying: false,
            item: props.item,
            player: this.emptyPlayer()
        };
    }

    emptyPlayer()
    {
        return { 
            getDuration: () => 100,
            getCurrentTime: () => 0
        }
    }

    compressPlayerInfo()
    {
        return {
            time: this.state.player.getCurrentTime(),
            volume: this.state.player.getVolume()
        };
    }

    updatePlayer()
    {
        this.setState({ currentTime: this.state.player.getCurrentTime() });
    }

    shouldComponentUpdate(nextProps)
    {
        return (nextProps.item.queueId !== this.state.item.queueId || this.state.isPlaying);
    }

    componentDidUpdate(props)
    {
        if (props.item.queueId !== this.state.item.queueId) this.setState({ item: props.item });
    }

    handlePlay(event)
    {
        this.state.player.playVideo();

        this.setState({ isPlaying: true });

        this.props.onPlay(this.compressPlayerInfo());
    }

    handlePause(event)
    {
        this.state.player.pauseVideo();

        this.setState({ isPlaying: false });

        this.props.onPause(this.compressPlayerInfo());
    }

    handleTime(event)
    {
        this.state.player.seekTo(event.target.value);
        this.props.onTimeChange(this.compressPlayerInfo());
    }

    handleVolume(event)
    {
        this.props.onVolumeChange({ 
            ...this.compressPlayerInfo(),
            volume: event.target.value
        });
    }

    handleOnReady(event)
    {
        event.target.setVolume(0);

        this.setState({ player: event.target });
    }

    componentDidMount()
    {
        this.timer = setInterval(() => {
            this.updatePlayer();
        }, 1000);
    }

    componentWillUnmount()
    {
        clearInterval(this.timer);
    }

    render()
    {
        return (
            <div className = "player">
                <p>
                    {this.state.item.data.title}
                    <span>{this.state.currentTime}</span>
                </p>
                
                <PlayPauseButton
                    setPlay = {this.handlePlay.bind(this)}
                    setPause = {this.handlePause.bind(this)}
                />

                <TimeSlider
                    current = {this.state.currentTime}
                    duration = {this.state.player.getDuration()}
                    onTimeChange = {this.handleTime.bind(this)}
                />
                <VolumeSlider onVolumeChange = {this.handleVolume.bind(this)} />

                <YouTube
                    className = "player-hidden-iframe"
                    videoId = {this.state.item.data.id}
                    onReady = {this.handleOnReady.bind(this)}
                />
            </div>
        );
    }
}
