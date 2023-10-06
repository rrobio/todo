import { Todo } from '../model/todo.ts'

import { getRandomTodoData, todoFactory } from './helpers.ts'

describe('serialization', () => {
  test('export to json', () => {
    const data = getRandomTodoData()
    const todo = todoFactory(data)
    expect(JSON.stringify(todo.export())).toBe(JSON.stringify(data))
  })
  test('export to json after modifying', () => {
    const data = getRandomTodoData()
    const todo = todoFactory(data)
    expect(JSON.stringify(todo.export())).toBe(JSON.stringify(data))
    todo.toggleDone()
    expect(JSON.stringify(todo.export())).not.toBe(JSON.stringify(data))
  })
})
describe('deserialization', () => {
  test('import from json', () => {
    const data = getRandomTodoData()
    const todo = todoFactory(JSON.parse(JSON.stringify(data)))
    expect(todo.text).toBe(data.text)
    expect(todo.id).toBe(data.id)
    expect(todo.done).toBe(data.done)
    expect(todo.skip).toBe(data.skip)
    expect(todo).toBeInstanceOf(Todo)
  })
  test('should be equal when importing from export', () => {
    const data = getRandomTodoData()
    const todo1 = todoFactory(data)
    const todo2 = todoFactory(JSON.parse(JSON.stringify(todo1.export())))
    expect(todo2).toBeInstanceOf(Todo)
    expect(todo2.export()).toStrictEqual(todo1.export())
  })
})
