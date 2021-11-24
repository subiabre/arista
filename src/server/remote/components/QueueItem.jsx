import React from "react";

export default class QueueItem extends React.Component
{
    onClick()
    {
        this.props.onClick(this.props.item);
    }

    render()
    {
        return (
            <li
                className = {this.props.item.isPlaying ? 'active' : 'idle'}
                onClick = {this.onClick.bind(this)}
            >
                {this.props.item.data.title}
            </li>
        );
    }
}
