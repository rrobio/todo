import { Todo } from './model/todo.ts'

describe('new Todo', () => {
  test('should create new todo', () => {
    const todo = new Todo('test')
    expect(todo).toBeInstanceOf(Todo)
    expect(todo.text).toBe('test')
    expect(todo.id).not.toBeNull()
  })
})
describe('Todo', () => {
  test('should create new todo', () => {
    const todo = new Todo('test')
    expect(todo).toBeInstanceOf(Todo)
  })
  test('should toggle done state', () => {
    const todo = new Todo('test')
    expect(todo.done).toBeFalsy()
    todo.toggleDone()
    expect(todo.done).toBeTruthy()
  })
  test('should toggle skip state', () => {
    const todo = new Todo('test')
    expect(todo.skip).toBeFalsy()
    todo.toggleSkip()
    expect(todo.skip).toBeTruthy()
  })
})
describe('recreate todo', () => {
  test('should create new todo', () => {
    const todo1 = new Todo('test')
    expect(todo1).toBeInstanceOf(Todo)
    todo1.toggleDone()
    const todo2 = Todo.clone(todo1.text, todo1.done, todo1.skip, todo1.id)
    expect(todo2.text).toBe(todo1.text)
    expect(todo2.done).toBe(todo1.done)
    expect(todo2.skip).toBe(todo1.skip)
    expect(todo2.id).toBe(todo1.id)
  })
  test('done state should not be equal', () => {
    const todo1 = new Todo('test')
    expect(todo1).toBeInstanceOf(Todo)
    const todo2 = Todo.clone(todo1.text, todo1.done, todo1.skip, todo1.id)
    todo1.toggleDone()
    expect(todo2.text).toBe(todo1.text)
    expect(todo2.done).not.toBe(todo1.done)
    expect(todo2.skip).toBe(todo1.skip)
    expect(todo2.id).toBe(todo1.id)
  })
})
