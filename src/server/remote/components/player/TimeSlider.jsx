import React from "react";

export default class TimeSlider extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = { ...props };
    }

    shouldComponentUpdate(nextProps)
    {
        return nextProps.duration !== this.state.duration || nextProps.current !== this.state.current;
    }

    componentDidUpdate(props)
    {
        this.setState({ ...props });
    }

    render()
    {
        return (
            <input
                type = "range"
                min = {0}
                max = {this.props.duration}
                value = {this.state.current}
                onInput = {this.props.onTimeChange}
            />
        )
    }
}
