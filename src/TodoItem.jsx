import React from 'react';
import './TodoItem.css';

const TodoItem = ({ name, completed }) => (
    <li
        className="task"
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {name}
    </li>
);

export default TodoItem;