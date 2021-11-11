import React from "react";

export default class QueueItem extends React.Component
{
    render()
    {
        return (
            <li>
                {this.props.name}
            </li>
        );
    }
}
