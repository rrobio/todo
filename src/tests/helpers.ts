import { faker } from '@faker-js/faker'
import { Todo } from '../model/todo'

export interface TodoData {
  text: string
  id?: number
  done: boolean
  skip: boolean
}

export function getRandomTodoData (): TodoData {
  return {
    text: faker.lorem.lines(2),
    id: undefined,
    done: faker.datatype.boolean(),
    skip: faker.datatype.boolean()
  }
}

export function todoFactory (data: Partial<TodoData>): Todo {
  const randomData = getRandomTodoData()
  return new Todo(data.text ?? randomData.text, data.done ?? randomData.done, data.skip ?? randomData.skip, data.id ?? randomData.id)
}

export function todoArrayFactory (n: number): Todo[] {
  // generate n random todos
  return [...Array(n).keys()].map(() => todoFactory({}))
}
