import React from 'react';

import { TodoInput } from './TodoInput.js';
import { TodoList } from './TodoList.js';

export class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.addTodo = this.addTodo.bind(this);
        this.changeActions = this.changeActions.bind(this);

        this.state = {
            todos: [
                {
                    id: '5484-hallo',
                    name: 'hallo',
                    isCompleted: false
                },
                {
                    id: '14555-hoe',
                    name: 'hoe',
                    isCompleted: false
                },
                {
                    id: '254410-gaat',
                    name: 'gaat',
                    isCompleted: false
                },
                {
                    id: '354822-het',
                    name: 'het',
                    isCompleted: false
                },
            ]
        };
    }

    addTodo(todo) {
        let random = Math.floor((Math.random() * 100000) + 1);
        let id = random + '-' + todo;
        
        const newTodo = {
            id: id,
            name: todo,
            isCompleted: false
        };

        let newTodos = JSON.parse(JSON.stringify(this.state.todos));
        newTodos.push(newTodo);

        this.setState({
            todos: newTodos
        });
    }

    changeActions(action, id, value = '') {
        let newTodos = JSON.parse(JSON.stringify(this.state.todos));
        const index = newTodos.findIndex(todo => todo.id === id);

        switch (action) {
            case 'UPDATE':
                newTodos[index].name = value;
                break;
            case 'REMOVE':
                newTodos.splice(index, 1);
                break;
            case 'COMPLETE':
                newTodos[index].isCompleted = true;
                break;
            case 'UNCOMPLETE':
                newTodos[index].isCompleted = false;
                break;
        }

        this.setState({ todos: newTodos });
    }


    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h1>My To-Do's!</h1>
                    <p>What are you up to today?</p>
                    <TodoInput addTodo={this.addTodo} />
                    {/* <TodoList todos={this.state.todos} remove={this.removeTodo} update={this.updateTodo} complete={this.completeTodo} uncomplete={this.uncompleteTodo}/> */}
                    <TodoList todos={this.state.todos} change={this.changeActions}/>
                </div>
            </div>
        );
    }
}