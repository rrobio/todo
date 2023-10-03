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
describe('export todo', () => {
  test('should export todo into a tododata object', () => {
    const todo = new Todo('test', 12345)
    expect(todo.export().text).toBe('test')
    expect(todo.export().id).toBe(12345)
  })
  test('export to json', () => {
    const todo = new Todo('test', 12345)
    expect(JSON.stringify(todo.export())).toBe('{"text":"test","done":false,"skip":false,"id":12345}')
  })
})
describe('import todo', () => {
  test('should import todo from tododata', () => {
    const todo = Todo.import({ text: 'test', id: 12345, done: false, skip: false })
    expect(todo.text).toBe('test')
    expect(todo.id).toBe(12345)
  })
  test('import from json', () => {
    const todo = Todo.import(JSON.parse('{"text":"test1","done":false,"skip":false,"id":12345}'))
    expect(todo.text).toBe('test1')
    expect(todo.id).toBe(12345)
    expect(todo).toBeInstanceOf(Todo)
  })
  test('should be equal when importing from export', () => {
    const todo1 = new Todo('test', 12345)
    const todo2 = Todo.import(JSON.parse(JSON.stringify(todo1.export())))
    expect(todo2).toBeInstanceOf(Todo)
    expect(todo2.text).toBe(todo1.text)
    expect(todo2.done).toBe(todo1.done)
    expect(todo2.skip).toBe(todo1.skip)
    expect(todo2.id).toBe(todo1.id)
  })
})
