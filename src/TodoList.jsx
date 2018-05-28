import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
const API_URL = '/api/todos/';

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

    loadTodos() {
        fetch(API_URL)
            .then(res => {
                if (!res.ok) {
                    if (res.status >= 400 && res.status < 500) {
                        return res.json().then(data => {
                            let err = { errorMessage: data.message };
                            throw err;
                        });
                    } else {
                        let err = { errorMessage: 'Please try again later. Server error.' };
                        throw err;
                    }
                }
                return res.json();
            }).then(todos => this.setState({ todos }))
            .catch(err => console.log(err));
    }

    addTodo(todo) {
        fetch(API_URL, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ name: todo })
        }).then(res => {
            if (!res.ok) {
                if (res.status >= 400 && res.status < 500) {
                    return res.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    });
                } else {
                    let err = { errorMessage: 'Please try again later. Server error.' };
                    throw err;
                }
            }
            return res.json();
        }).then(newTodo => {
            this.setState({ todos: [...this.state.todos, newTodo] });
        }).catch(err => console.log(err));
    }

    render() {
        const todos = this.state.todos.map((todo) => (
            <TodoItem
                key={todo._id}
                {...todo}
            />
        ));
        return (
            <div>
                <h1>Todo List</h1>
                <TodoForm addTodo={this.addTodo} />
                <ul>
                    {todos}
                </ul>
            </div>
        );
    }
}