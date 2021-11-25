import React from "react";

export default class VolumeSlider extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <input
                type = "range"
                min = {0}
                max = {100}
                onInput = {this.props.onVolumeChange}
            />
        )
    }
}
