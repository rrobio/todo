import './style.css'
import * as td from './todo.js'
import { Todo } from './model/todo.ts'

const todos = td.loadTodoOrEmpty()

if (todos.length === 0) {
  todos.push(new Todo('test1'))
}

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
      const todoHTMLElement = e.generateNode()
      app.appendChild(todoHTMLElement)
    })
}

renderTodos(todos);

(document.querySelector('#new-todo') as HTMLButtonElement).addEventListener('click', () => {
  const elem = document.querySelector('#new-todo-text') as HTMLTextAreaElement
  const value = elem.value === '' ? 'empty' : elem.value
  elem.value = ''
  const nt = new Todo(value)
  todos.push(nt)
  renderTodos(todos)
  td.saveTodo(todos)
});

(document.getElementById('filter-select') as HTMLSelectElement).addEventListener('change', () => { renderTodos(todos) })

document.addEventListener('renderTodos', () => {
  renderTodos(todos)
})

document.addEventListener('deleteTodo', (e) => {
  const target = e.target as HTMLButtonElement
  td.removeTodoByID(todos, +target.value)
  renderTodos(todos)
  td.saveTodo(todos)
})

document.addEventListener('toggleTodo', (e) => {
  const target = e.target as HTMLInputElement
  td.toggleTodoByID(todos, +target.value)
  renderTodos(todos)
  td.saveTodo(todos)
})

document.addEventListener('toggleSkip', (e) => {
  const target = e.target as HTMLInputElement
  td.skipTodoByID(todos, +target.value)
  td.pushBackTodo(todos, +target.value)
  renderTodos(todos)
  td.saveTodo(todos)
})
// setupCounter(document.querySelector('#counter'))