import React from "react"

export default class ResultsItem extends React.Component
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
