import { Todo, type TodoData } from './model/todo.ts'
import { faker } from '@faker-js/faker'

function getRandomTodoData (): TodoData {
  return {
    text: faker.lorem.lines(2),
    done: faker.datatype.boolean(),
    skip: faker.datatype.boolean(),
    id: +faker.date.anytime()
  }
}

describe('new Todo', () => {
  test('should create new todo', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data.text)
    expect(todo).toBeInstanceOf(Todo)
    expect(todo.text).toBe(data.text)
    expect(todo.id).not.toBeNull()
  })
})
describe('Todo', () => {
  test('should create new todo', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data.text)
    expect(todo).toBeInstanceOf(Todo)
  })
  test('should toggle done state', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data.text)
    expect(todo.done).toBeFalsy()
    todo.toggleDone()
    expect(todo.done).toBeTruthy()
  })
  test('should toggle skip state', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data.text)
    expect(todo.skip).toBeFalsy()
    todo.toggleSkip()
    expect(todo.skip).toBeTruthy()
  })
})
describe('recreate todo', () => {
  test('should clone todo', () => {
    const data = getRandomTodoData()
    const todo1 = new Todo(data.text)
    expect(todo1).toBeInstanceOf(Todo)
    todo1.toggleDone()
    const todo2 = Todo.clone(todo1.text, todo1.done, todo1.skip, todo1.id)
    expect(todo1.export()).toStrictEqual(todo2.export())
  })
  test('done state should not be equal', () => {
    const data = getRandomTodoData()
    const todo1 = new Todo(data.text)
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
    const todo = Todo.import(data)
    expect(todo.export().text).toBe(data.text)
    expect(todo.export().id).toBe(data.id)
  })
  test('export to json', () => {
    const data = getRandomTodoData()
    const todo = Todo.import(data)
    expect(JSON.stringify(todo.export())).toBe(JSON.stringify(data))
  })
  test('export to json (modified)', () => {
    const data = getRandomTodoData()
    const todo = Todo.import(data)
    expect(JSON.stringify(todo.export())).toBe(JSON.stringify(data))
    todo.toggleDone()
    expect(JSON.stringify(todo.export())).not.toBe(JSON.stringify(data))
  })
})
describe('import todo', () => {
  test('should import todo from tododata', () => {
    const data = getRandomTodoData()
    const todo = Todo.import(data)
    expect(todo.export()).toEqual(data)
  })
  test('import from json', () => {
    const data = getRandomTodoData()
    const todo = Todo.import(JSON.parse(JSON.stringify(data)))
    expect(todo.text).toBe(data.text)
    expect(todo.id).toBe(data.id)
    expect(todo).toBeInstanceOf(Todo)
  })
  test('should be equal when importing from export', () => {
    const data = getRandomTodoData()
    const todo1 = Todo.import(data)
    const todo2 = Todo.import(JSON.parse(JSON.stringify(todo1.export())))
    expect(todo2).toBeInstanceOf(Todo)
    expect(todo2.export()).toStrictEqual(todo1.export())
  })
})
