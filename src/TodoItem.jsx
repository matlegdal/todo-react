import React from 'react';
import './TodoItem.css';

export default function TodoItem({ name, completed, onDelete, onToggle }) {
    return (
        <li className={`task ${completed ? 'done' : ''}`} onClick={onToggle}>
            <span >
                {name}
            </span>
            <span className="delete" onClick={onDelete}> X </span>
        </li>
    );
}