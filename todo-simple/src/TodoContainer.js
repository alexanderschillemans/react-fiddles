import React from 'react';

import { TodoInput } from './TodoInput.js';
import { TodoList } from './TodoList.js';

export class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);

        this.state = {
            todos: []
        };
    }

    addTodo(todo) {
        this.setState({
            todos: [...this.state.todos, todo]
        });
    }

    removeTodo(todo) {
        const newTodos = [...this.state.todos]
        const indexOf = newTodos.indexOf(todo);
        newTodos.splice(indexOf, 1);

        this.setState({
            todos: newTodos
        });

    }

    render() {
        return (
            <div className="card">
                <h1>My To-Do's!</h1>
                <p>What are you up to today?</p>
                <TodoInput addTodo={this.addTodo} />
                <TodoList todos={this.state.todos} remove={this.removeTodo} />
            </div>
        );
    }
}