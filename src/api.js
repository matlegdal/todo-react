const API_URL = '/api/todos/';

export async function getTodos() {
    return fetch(API_URL)
        .then(res => {
            handleRes(res);
            return res.json();
        });
}

export async function createTodo(todo) {
    return fetch(API_URL, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            name: todo
        })
    }).then(res => {
        handleRes(res);
        return res.json();
    });
}

export async function deleteTodo(id) {
    return fetch(`${API_URL}${id}`, {
        method: 'delete',
    }).then(res => handleRes(res));
}

export async function updateTodo(todo) {
    return fetch(`${API_URL}${todo._id}`, {
        method: 'put',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            completed: !todo.completed
        })
    }).then(res => {
        handleRes(res);
        return res.json();
    });
}

function handleRes(res) {
    if (!res.ok) {
        if (res.status >= 400 && res.status < 500) {
            return res.json().then(data => {
                let err = {
                    errorMessage: data.message
                };
                throw err;
            });
        } else {
            let err = {
                errorMessage: 'Please try again later. Server error.'
            };
            throw err;
        }
    }
}