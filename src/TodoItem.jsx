import React from 'react';
import './TodoItem.css';

export default function TodoItem({ name, completed, onDelete, onToggle }) {
    return (
        <li className="task">
            <span
                style={{
                    textDecoration: completed ? 'line-through' : 'none'
                }}
                onClick={onToggle}
            >
                {name}
            </span>

            <span className="delete" onClick={onDelete}> X </span>
        </li>
    );
}