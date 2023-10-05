import './style.css'
import * as td from './helpers.js'
import { Todo } from './model/todo.ts'
import generateNode from './model/todoElement.ts'
import LocalStorageRepository from './repository/localstorage.ts'
import { Repository } from './repository/repository.ts'

const repository = new Repository(new LocalStorageRepository(Todo))
let todos = repository.getAll()

function getFilter (): string {
  return (document.getElementById('filter-select') as HTMLSelectElement).value
}

function renderTodos (todos: Todo[]): void {
  const filter = getFilter()
  const app = document.querySelector('#app') as HTMLDivElement
  app.replaceChildren()
  todos
    .filter((e) => {
      switch (filter) {
        case 'done':
          return e.done
        case 'skip':
          return e.skip
        default:
          return true
      }
    })
    .forEach(e => {
      const todoHTMLElement = generateNode(e)
      app.appendChild(todoHTMLElement)
    })
}

renderTodos(todos);

(document.querySelector('#new-todo') as HTMLButtonElement).addEventListener('click', () => {
  const elem = document.querySelector('#new-todo-text') as HTMLTextAreaElement
  const value = elem.value === '' ? 'empty' : elem.value
  elem.value = ''
  const newTodo = new Todo(value)
  todos.push(newTodo)
  renderTodos(todos)
  repository.setAll(todos)
});

(document.getElementById('filter-select') as HTMLSelectElement).addEventListener('change', () => { renderTodos(todos) })

document.addEventListener('renderTodos', () => {
  renderTodos(todos)
})

document.addEventListener('deleteTodo', (e) => {
  const target = e.target as HTMLButtonElement
  const todo = repository.get(+target.value)
  if (todo !== null) {
    repository.remove(todo)
    todos = repository.getAll() ?? []
    renderTodos(todos)
  }
})

document.addEventListener('toggleTodo', (e) => {
  const target = e.target as HTMLInputElement
  const todo = td.toggleTodoByID(todos, +target.value)
  if (todo !== null) {
    repository.setAll(todos)
    renderTodos(todos)
  }
})

document.addEventListener('toggleSkip', (e) => {
  const target = e.target as HTMLInputElement
  const todo = td.skipTodoByID(todos, +target.value)
  if (todo !== null) {
    repository.setAll(todos)
    renderTodos(todos)
  }
})
