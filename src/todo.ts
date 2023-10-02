export type ID = string;

export type Todo = {
    text: string;
    done: boolean;
    skip: boolean;
    id: ID;
}

export function newTodo(t: string): Todo {
	return {
    	text: t,
    	done: false,
    	skip: false,
    	id: crypto.randomUUID(),
	} as Todo;
}

export function genereateNode(todo: Todo) {
    const todoNode = document.createElement("div");
    const inputDone = document.createElement("input");
    const labelDone = document.createElement("label");
    const inputSkip = document.createElement("input");
    const labelSkip = document.createElement("label");
    const inputDelete = document.createElement("button");
    const labelDelete = document.createElement("label");
    const text = document.createElement("p");

    todoNode.setAttribute('class', 'todo');

    inputDone.setAttribute('type', 'checkbox');
    inputDone.setAttribute('value', todo.id);
    inputDone.setAttribute('id', `done-button#${todo.id}`);
    if (todo.done) {
        inputDone.checked = true;
    }
    inputDone.addEventListener('click', (event) => {
        event.preventDefault();
        let toggleEvent = new Event('toggleTodo', { bubbles: true });
        event.target!.dispatchEvent(toggleEvent);
    })
    labelDone.setAttribute('for', `done-button#${todo.id}`);
    labelDone.textContent = "done";

    inputSkip.setAttribute('type', 'checkbox');
    inputSkip.setAttribute('value', todo.id);
    inputSkip.setAttribute('id', `skip-button#${todo.id}`);
    if (todo.skip) {
        inputSkip.checked = true;
    }
    inputSkip.addEventListener('click', (event) => {
        event.preventDefault();
        let toggleEvent = new Event('skipTodo', { bubbles: true });
        event.target!.dispatchEvent(toggleEvent);
    })
    labelSkip.setAttribute('for', `skip-button#${todo.id}`);
    labelSkip.textContent = "skip";

    inputDelete.setAttribute('type', 'button');
    inputDelete.setAttribute('value', todo.id);
    inputDelete.setAttribute('id', 'delete-button');
    inputDelete.setAttribute('id', `delete-button#${todo.id}`);
    inputDelete.innerHTML = "x";
    inputDelete.addEventListener('click', function(event) {
        event.preventDefault();
        let deleteEvent = new Event('deleteTodo', { bubbles: true });
        event.target!.dispatchEvent(deleteEvent);
    })
    labelDelete.setAttribute('for', `delete-button#${todo.id}`);
    labelDelete.textContent = "delete";

    text.textContent = todo.text;


    if (todo.done) inputSkip.disabled = true;

    todoNode.appendChild(inputDone);
    todoNode.appendChild(labelDone);
    todoNode.appendChild(inputSkip);
    todoNode.appendChild(labelSkip);
    todoNode.appendChild(inputDelete);
    todoNode.appendChild(labelDelete);
    todoNode.appendChild(text);

    return todoNode;
}

export function loadTodoOrEmpty(): Array<Todo> {
    let todojson = localStorage.getItem('todos');
    if (typeof todojson === "string") {
        return JSON.parse(todojson);
    }
    return [];
}

export function saveTodo(todos: Array<Todo>) {
    let todoJSON = JSON.stringify(todos);
    localStorage.setItem('todos', todoJSON);
}

export function skipTodoByID(todos: Array<Todo>, id: ID) {
    const i = todos.findIndex((e) => {
        return e.id === id;
    })
    if (i >= 0) todos[i].skip = !todos[i].skip;
}

export function toggleTodoByID(todos: Array<Todo>, id: ID) {
    const i = todos.findIndex((e) => {
        return e.id === id;
    })
    if (i >= 0) todos[i].done = !todos[i].done;
}

export function removeTodoByID(todos: Array<Todo>, id: ID) {
    const i = todos.findIndex((e) => {
        return e.id === id;
    })
    if (i >= 0) todos.splice(i, 1);
}

export function pushBackTodo(todos: Array<Todo>, id: ID) {
    const i = todos.findIndex((e) => {
        return e.id === id;
    })

    if (i >= 0) {
        todos.push(...todos.splice(i, 1));
    }
}
