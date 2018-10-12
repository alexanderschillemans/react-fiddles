import React from 'react';
import { TodoItem } from './TodoItem.js';

export const TodoList = (props) => {
    const todosNode = props.todos.map(todo => {
        return <TodoItem item={todo} remove={props.remove} />;
    });

    return <ol>{todosNode}</ol>;
}