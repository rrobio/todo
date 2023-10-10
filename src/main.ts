import './style.css'
import { Todo } from './model/todo.ts'
import generateNode from './model/todoElement.ts'
import LocalStorage from './storage/localstorage.ts'
import ModelRepository from './repository/ModelRepository.ts'

const repository = new ModelRepository(Todo, new LocalStorage('Todo'))

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

renderTodos(repository.getAll());

(document.querySelector('#new-todo') as HTMLButtonElement).addEventListener('click', () => {
  const elem = document.querySelector('#new-todo-text') as HTMLTextAreaElement
  const value = elem.value === '' ? 'empty' : elem.value
  elem.value = ''
  const newTodo = new Todo(value, false, false)
  repository.add(newTodo)
  renderTodos(repository.getAll())
});

(document.getElementById('filter-select') as HTMLSelectElement).addEventListener('change', () => { renderTodos(repository.getAll()) })

document.addEventListener('renderTodos', () => {
  renderTodos(repository.getAll())
})

document.addEventListener('deleteTodo', (e) => {
  const target = e.target as HTMLButtonElement
  const todo = repository.get(+target.value)
  if (todo !== null) {
    repository.remove(todo)
    renderTodos(repository.getAll())
  }
})

document.addEventListener('toggleTodo', (e) => {
  const target = e.target as HTMLInputElement
  const todo = repository.get(+target.value)
  if (todo !== null) {
    todo.toggleDone()
    repository.set(todo)
    renderTodos(repository.getAll())
  }
})

document.addEventListener('toggleSkip', (e) => {
  const target = e.target as HTMLInputElement
  const todo = repository.get(+target.value)
  if (todo !== null) {
    todo.toggleSkip()
    repository.set(todo)
    renderTodos(repository.getAll())
  }
})
