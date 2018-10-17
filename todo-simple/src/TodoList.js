import React from 'react';
import { TodoItem } from './TodoItem.js';

export const TodoList = (props) => {
    const todosNode = props.todos.map((todo) => {
        return <TodoItem key={todo.id} item={todo} change={props.change} />
    });

    return <ol>{todosNode}</ol>;
}