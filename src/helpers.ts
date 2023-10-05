import { type Todo } from './model/todo.ts'
import { type ID } from './repository/repository.ts'

function getIndexByID (todos: Todo[], id: ID): number {
  return todos.findIndex((e) => {
    return e.id === id
  })
}

export function skipTodoByID (todos: Todo[], id: ID): Todo | null {
  const i = getIndexByID(todos, id)
  if (i >= 0) {
    todos[i].skip = !todos[i].skip
    return todos[i]
  }
  return null
}

export function toggleTodoByID (todos: Todo[], id: ID): Todo | null {
  const i = getIndexByID(todos, id)
  if (i >= 0) {
    todos[i].done = !todos[i].done
    return todos[i]
  }
  return null
}
