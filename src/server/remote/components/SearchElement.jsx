import React from "react";

export default class SearchElement extends React.Component
{
    render()
    {
        return (
            <form
                className = "search"
                onSubmit = {this.props.onSubmit}
            >
                <input
                    onInput = {this.props.onInput}
                ></input>
                <button
                    onSubmit = {this.props.onSubmit}
                >Search</button>
            </form>
        )
    }
}
