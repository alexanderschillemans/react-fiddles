import React from 'react';

const aStyle = {
    fontSize: 9,
}

export class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.remove(e.target.value);
    }

    render() {
        return <li>{this.props.item} <a href="#" style={aStyle} onClick={this.handleClick}>Delete</a></li>;
    }
}