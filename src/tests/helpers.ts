import { faker } from '@faker-js/faker'
import { Todo, type TodoData } from '../model/todo'

export function getRandomTodoData (): TodoData {
  return {
    text: faker.lorem.lines(2),
    id: +faker.date.anytime(),
    done: faker.datatype.boolean(),
    skip: faker.datatype.boolean()
  }
}

export function todoFactory (data: Partial<TodoData>): Todo {
  const randomData = getRandomTodoData()
  return Todo.clone(data.text ?? randomData.text, data.done ?? randomData.done, data.skip ?? randomData.skip, data.id ?? randomData.id)
}

export function todoArrayFactory (n: number): Todo[] {
  // generate n random todos
  return [...Array(n).keys()].map(() => todoFactory({}))
}
