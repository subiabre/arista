import React from "react";
import QueueItem from "./QueueItem";

export default class QueueList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = { items: props.items };
    }

    shouldComponentUpdate(nextProps)
    {
        return nextProps.items !== this.state.items;
    }

    componentDidUpdate(props)
    {
        this.setState({ items: props.items });
    }

    render()
    {
        const items = this.state.items.map((item, index) => {
            return <QueueItem 
                key = {index}
                item = {item}
                onClick = {this.props.onItemClick}
            />
        });

        return (
            <ul>
                {items}
            </ul>
        );
    }
}
