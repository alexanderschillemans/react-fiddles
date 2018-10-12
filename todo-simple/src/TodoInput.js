import React from 'react';

export class TodoInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (e.target.value !== '') {
                this.props.addTodo(e.target.value);
                e.target.value = '';
            } else {
                alert('Please input something!');
            }
            
        }
    }

    render() {
        return (
            <input type="text" onKeyPress={this.handleKeyPress} placeholder="E.g. Watering the plants" />
        );
    }
}