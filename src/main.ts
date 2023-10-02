import './style.css'
import * as td from './todo.js'

const todos = td.loadTodoOrEmpty();

if (todos.length === 0) {
	todos.push(new Todo("test1"))
}

function getFilter() {
	return document.getElementById('filter-select').value
}

function renderTodos(todos) {
    const filter = getFilter()
    const app = document.querySelector('#app')
    app.replaceChildren();
    todos
    	.filter((e) => {
			switch(filter) {
				case "all":
					return true
				case "done":
					return e.done
				case "skip":
					return e.skip
			}
    	})
    	.forEach((e) => {
        const t = td.genereateNode(e)
        app.appendChild(t)
    })
}

renderTodos(todos)

document.querySelector("#new-todo").addEventListener('click', (e) => {
    let elem = document.querySelector("#new-todo-text");
    const value = elem.value === ""?"empty":elem.value; 
    elem.value = "";
	let nt = new td.Todo(value)
	todos.push(nt)
	renderTodos(todos)
	td.saveTodo(todos)
})

document.getElementById('filter-select').addEventListener('change', (e) => renderTodos(todos))

document.addEventListener('deleteTodo', (e) => {
    td.removeTodoByID(todos, e.target.value)
	renderTodos(todos)
	td.saveTodo(todos)
})

document.addEventListener('toggleTodo', (e) => {
    td.toggleTodoByID(todos, e.target.value)
	renderTodos(todos)
	td.saveTodo(todos)
})

document.addEventListener('skipTodo', (e) => {
    td.skipTodoByID(todos, e.target.value)
    td.pushBackTodo(todos, e.target.value)
	renderTodos(todos)
	td.saveTodo(todos)
})
//setupCounter(document.querySelector('#counter'))
