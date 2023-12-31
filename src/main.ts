import './style.css'
import { Todo } from './model/todo.ts'
import LocalStorage from './storage/localstorage.ts'
import ModelRepository from './repository/modelRepository.ts'
import todoTemplate from './model/todoTemplate.html?raw'
import render from './templates/template.ts'

const repository = new ModelRepository(Todo, new LocalStorage('Todo'))

function getFilter (): string {
  return (document.getElementById('filter-select') as HTMLSelectElement).value
}

function renderTodos (todos: Todo[]): void {
  const filter = getFilter()
  const app = document.querySelector('#app') as HTMLDivElement
  app.replaceChildren()
  app.innerHTML = ''
  const nodes = todos
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
    .map(e => {
      const checkContext = { doneChecked: '', skipChecked: '' }
      checkContext.doneChecked = e.done ? 'checked' : ''
      checkContext.skipChecked = e.skip ? 'checked' : ''
      return render(todoTemplate, e, checkContext)
    })
  app.innerHTML = nodes.join('')
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

document.addEventListener('todoEventDelete', (e) => {
  const target = e.target as HTMLButtonElement
  const todo: Todo | null = repository.get(+target.value)
  if (todo !== null) {
    repository.remove(todo)
    renderTodos(repository.getAll())
  }
})

document.addEventListener('todoEventToggleDone', (e) => {
  const target = e.target as HTMLInputElement
  const todo = repository.get(+target.value)
  if (todo !== null) {
    todo.toggleDone()
    repository.set(todo)
    renderTodos(repository.getAll())
  }
})

document.addEventListener('todoEventToggleSkip', (e) => {
  const target = e.target as HTMLInputElement
  const todo = repository.get(+target.value)
  if (todo !== null) {
    todo.toggleSkip()
    repository.set(todo)
    renderTodos(repository.getAll())
  }
})
