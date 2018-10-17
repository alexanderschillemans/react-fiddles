import React from 'react';

import { TodoInput } from './TodoInput.js';
import { TodoList } from './TodoList.js';

export class TodoContainer extends React.Component {

    constructor(props) {
        super(props);
        
        this.addTodo = this.addTodo.bind(this);
        this.changeActions = this.changeActions.bind(this);

        this.apiBaseUrl = "http://5bc71caacc83760013c1cc76.mockapi.io/api/v1";

        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        const url = this.apiBaseUrl + "/tasks";

        fetch(url).then((response) => {
            return response.json();
        })
            .then((data) => {
                this.setState({
                    todos: data
                })
            })
            .catch((error) => console.log(error));
    }

    addTodo(todo) {
        // let random = Math.floor((Math.random() * 100000) + 1);
        // let id = random + '-' + todo;
        
        // const newTodo = {
        //     id: id,
        //     name: todo,
        //     isCompleted: false
        // };

        const url = this.apiBaseUrl + '/tasks';
        let newTodos = JSON.parse(JSON.stringify(this.state.todos));
        let data = { "id" : null, "name": todo, "isCompleted": false }
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((response) => {
            newTodos.push(response);
            
            this.setState({
                todos: newTodos
            });

        }).catch(error => console.error('Error:', error));
    }

    changeActions(action, id, value = '') {
        let newTodos = JSON.parse(JSON.stringify(this.state.todos));
        const index = newTodos.findIndex(todo => todo.id === id);

        const url = this.apiBaseUrl + '/tasks/' + id;
        let data = {}

        switch (action) {
            case 'UPDATE':
                newTodos[index].name = value;

                data = { "name": value };

                fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(response => console.log('Success', JSON.stringify(response))).catch(error => console.error('Error:', error));

                break;
            case 'REMOVE':
                newTodos.splice(index, 1);

                fetch(url, {
                    method: 'DELETE',
                }).then(res => res.json()).then(response => console.log('Success', JSON.stringify(response))).catch(error => console.error('Error:', error));

                break;
            case 'COMPLETE':
                newTodos[index].isCompleted = true;

                data = { "isCompleted": true };

                fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(response => console.log('Success', JSON.stringify(response))).catch(error => console.error('Error:', error));

                break;
            case 'UNCOMPLETE':
                newTodos[index].isCompleted = false;

                data = { "isCompleted": false };

                fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(response => console.log('Success', JSON.stringify(response))).catch(error => console.error('Error:', error));

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