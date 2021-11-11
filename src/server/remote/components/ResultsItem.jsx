import React from "react"

export default class ResultsItem extends React.Component
{
    onClick()
    {
        this.props.onClick(this.props);
    }

    render()
    {
        return (
            <li
                onClick = {this.onClick.bind(this)}
            >
                <img src = {this.props.item.thumbnails[0].url} />
                <p>{this.props.item.title}</p>
                <p>{this.props.item.duration}</p>
            </li>
        );
    }
}
