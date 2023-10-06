import { Todo } from '../model/todo.ts'

import { getRandomTodoData, todoFactory } from './helpers.ts'

describe('Todo creation', () => {
  test('should create new todo from data object', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data)
    expect(todo).toBeInstanceOf(Todo)
    expect(todo.text).toBe(data.text)
    expect(todo.id).toBe(data.id)
    expect(todo.done).toBe(data.done)
    expect(todo.skip).toBe(data.skip)
    expect(todo.id).not.toBeNull()
  })
  test('should create new todo from string and id', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data.text, data.id)
    expect(todo).toBeInstanceOf(Todo)
    expect(todo.text).toBe(data.text)
    expect(todo.id).toBe(data.id)
    expect(todo.done).toBe(false)
    expect(todo.skip).toBe(false)
  })
  test('should create new todo just from string', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data.text)
    expect(todo).toBeInstanceOf(Todo)
    expect(todo.text).toBe(data.text)
    expect(todo.id).not.toBeNull()
    expect(todo.done).toBe(false)
    expect(todo.skip).toBe(false)
  })
})
describe('toggle Todo state', () => {
  test('should toggle done state', () => {
    const todo = todoFactory({ done: false })
    expect(todo.done).toBeFalsy()
    todo.toggleDone()
    expect(todo.done).toBeTruthy()
  })
  test('should toggle skip state', () => {
    const todo = todoFactory({ skip: false })
    expect(todo.skip).toBeFalsy()
    todo.toggleSkip()
    expect(todo.skip).toBeTruthy()
  })
})
describe('recreate Todo', () => {
  test('should clone todo', () => {
    const todo1 = todoFactory({})
    expect(todo1).toBeInstanceOf(Todo)
    todo1.toggleDone()
    const todo2 = Todo.clone(todo1.text, todo1.done, todo1.skip, todo1.id)
    expect(todo1.export()).toStrictEqual(todo2.export())
  })
  test('done state should not be equal', () => {
    const todo1 = todoFactory({})
    expect(todo1).toBeInstanceOf(Todo)
    const todo2 = Todo.clone(todo1.text, todo1.done, todo1.skip, todo1.id)
    todo1.toggleDone()
    expect(todo2.text).toBe(todo1.text)
    expect(todo2.done).not.toBe(todo1.done)
    expect(todo2.skip).toBe(todo1.skip)
    expect(todo2.id).toBe(todo1.id)
  })
})
describe('export todo', () => {
  test('should export todo into a tododata object', () => {
    const data = getRandomTodoData()
    const todo = todoFactory(data)
    expect(todo.export().text).toBe(data.text)
    expect(todo.export().id).toBe(data.id)
  })
})
describe('import todo', () => {
  test('should import todo from tododata', () => {
    const data = getRandomTodoData()
    const todo = todoFactory(data)
    expect(todo.export()).toEqual(data)
  })
})
