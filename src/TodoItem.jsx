import React from 'react';
import './TodoItem.css';

export default function TodoItem({ name, completed, onDelete }) {
    return (
        <li
            className="task"
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            {name}
            <span onClick={onDelete}> X </span>
        </li>
    );
}