import React from 'react';
import './TodoItem.css';

export default function TodoItem({ name, completed }) {
    return (
        <li
            className="task"
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            {name}
        </li>
    );
}