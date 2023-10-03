import { type Todo, type ID } from './model/todo.ts'

export function genereateNode (todo: Todo): HTMLDivElement {
  const todoNode = document.createElement('div')
  const inputDone = document.createElement('input')
  const labelDone = document.createElement('label')
  const inputSkip = document.createElement('input')
  const labelSkip = document.createElement('label')
  const inputDelete = document.createElement('button')
  const labelDelete = document.createElement('label')
  const text = document.createElement('p')

  todoNode.setAttribute('class', 'todo')

  inputDone.setAttribute('type', 'checkbox')
  inputDone.setAttribute('value', todo.id.toString())
  inputDone.setAttribute('id', `done-button#${todo.id}`)
  if (todo.done) {
    inputDone.checked = true
  }
  inputDone.addEventListener('click', (event) => {
    event.preventDefault()
    const toggleEvent = new Event('toggleTodo', { bubbles: true })
    event.target?.dispatchEvent(toggleEvent)
  })
  labelDone.setAttribute('for', `done-button#${todo.id}`)
  labelDone.textContent = 'done'

  inputSkip.setAttribute('type', 'checkbox')
  inputSkip.setAttribute('value', todo.id.toString())
  inputSkip.setAttribute('id', `skip-button#${todo.id}`)
  if (todo.skip) {
    inputSkip.checked = true
  }
  inputSkip.addEventListener('click', (event) => {
    event.preventDefault()
    const toggleEvent = new Event('skipTodo', { bubbles: true })
    event.target?.dispatchEvent(toggleEvent)
  })
  labelSkip.setAttribute('for', `skip-button#${todo.id}`)
  labelSkip.textContent = 'skip'

  inputDelete.setAttribute('type', 'button')
  inputDelete.setAttribute('value', todo.id.toString())
  inputDelete.setAttribute('id', 'delete-button')
  inputDelete.setAttribute('id', `delete-button#${todo.id}`)
  inputDelete.innerHTML = 'x'
  inputDelete.addEventListener('click', function (event) {
    event.preventDefault()
    const deleteEvent = new Event('deleteTodo', { bubbles: true })
    event.target?.dispatchEvent(deleteEvent)
  })
  labelDelete.setAttribute('for', `delete-button#${todo.id}`)
  labelDelete.textContent = 'delete'

  text.textContent = todo.text

  if (todo.done) inputSkip.disabled = true

  todoNode.appendChild(inputDone)
  todoNode.appendChild(labelDone)
  todoNode.appendChild(inputSkip)
  todoNode.appendChild(labelSkip)
  todoNode.appendChild(inputDelete)
  todoNode.appendChild(labelDelete)
  todoNode.appendChild(text)

  return todoNode
}

export function loadTodoOrEmpty (): Todo[] {
  const todojson = localStorage.getItem('todos')
  if (typeof todojson === 'string') {
    return JSON.parse(todojson)
  }
  return []
}

function getIndexByID (todos: Todo[], id: ID): number {
  return todos.findIndex((e) => {
    return e.id === id
  })
}

export function saveTodo (todos: Todo[]): void {
  const todoJSON = JSON.stringify(todos)
  localStorage.setItem('todos', todoJSON)
}

export function skipTodoByID (todos: Todo[], id: ID): void {
  const i = getIndexByID(todos, id)
  if (i >= 0) todos[i].skip = !todos[i].skip
}

export function toggleTodoByID (todos: Todo[], id: ID): void {
  const i = getIndexByID(todos, id)
  if (i >= 0) todos[i].done = !todos[i].done
}

export function removeTodoByID (todos: Todo[], id: ID): void {
  const i = getIndexByID(todos, id)
  if (i >= 0) todos.splice(i, 1)
}

export function pushBackTodo (todos: Todo[], id: ID): void {
  const i = getIndexByID(todos, id)

  if (i >= 0) {
    todos.push(...todos.splice(i, 1))
  }
}
