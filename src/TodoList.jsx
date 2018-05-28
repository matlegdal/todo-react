import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './TodoList.css';
import * as api from './api';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount() {
        this.loadTodos();
    }

    async loadTodos() {
        let todos = await api.getTodos();
        this.setState({ todos });
    }

    async addTodo(todo) {
        let newTodo = await api.createTodo(todo);
        this.setState({ todos: [...this.state.todos, newTodo] });
    }

    async deleteTodo(id) {
        await api.deleteTodo(id);
        const todos = this.state.todos.filter(todo => todo._id !== id);
        this.setState({ todos });
    }

    async toggleTodo(todo) {
        let updatedTodo = await api.updateTodo(todo)
        const todos = this.state.todos.map(todo => {
            return todo._id === updatedTodo._id ? { ...todo, completed: !todo.completed } : todo;
        })
        this.setState({ todos });
    }

    render() {
        const todos = this.state.todos.map((todo) => (
            <TodoItem
                key={todo._id}
                {...todo}
                onDelete={this.deleteTodo.bind(this, todo._id)}
                onToggle={this.toggleTodo.bind(this, todo)}
            />
        ));
        return (
            <div>
                <header>
                    <h1>todo <span>list</span></h1>
                    <h2>A simple todo list app built with React</h2>
                </header>

                <TodoForm addTodo={this.addTodo} />

                <ul id="todo-list" className="list">
                    {todos}
                </ul>
            </div>
        );
    }
}