import { Todo, type ID, type TodoData } from './model/todo.ts'

export function loadTodoOrEmpty (): Todo[] {
  const todojson = localStorage.getItem('todos')
  if (typeof todojson === 'string') {
    return JSON.parse(todojson).map((e: TodoData) => Todo.import(e))
  }
  return []
}

export function saveTodo (todos: Todo[]): void {
  const todoJSON = JSON.stringify(todos.map(e => e.export()))
  localStorage.setItem('todos', todoJSON)
}

function getIndexByID (todos: Todo[], id: ID): number {
  return todos.findIndex((e) => {
    return e.id === id
  })
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
