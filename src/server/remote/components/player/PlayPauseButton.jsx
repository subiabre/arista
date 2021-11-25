import React from "react";

export default class PlayPauseButton extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isPaused: true,
            label: 'Play',
            handler: event => this.props.setPlay(event)
        };
    }

    toggle()
    {
        // I know a ternary and inversing the state isPaused value would have theoretically worked, too
        // But in practice it did not work at all, I don't know why, js is hell
        switch (this.state.isPaused) {
            case true:
                this.setState({
                    isPaused: false,
                    label: 'Pause',
                    handler: event => this.props.setPause(event)
                });
                break;
            case false:
                this.setState({
                    isPaused: true,
                    label: 'Play',
                    handler: event => this.props.setPlay(event)
                });
                break;
        }
    }

    handleOnClick(event)
    {
        this.state.handler(event);
        this.toggle();
    }

    render()
    {
        return (
            <button 
                title = {this.state.label}
                onClick = {this.handleOnClick.bind(this)}
            >
                {this.state.label}
            </button>
        );
    }
}
