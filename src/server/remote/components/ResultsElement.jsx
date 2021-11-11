import React from "react";
import ResultsItem from "./ResultsItem";

export default class ResultsElement extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = { results: props.results }
    }

    shouldComponentUpdate(nextProps)
    {
        return nextProps.results !== this.state.results;
    }

    componentDidUpdate(props)
    {
        this.setState({ results: props.results });
    }

    render()
    {
        const items = this.state.results.map((item, index) => {
            return <ResultsItem 
                key = {index}
                name = {item.title}
            />
        });

        return (
            <ul>
                {items}
            </ul>
        );
    }
}
