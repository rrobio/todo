import { faker } from '@faker-js/faker'
import { Todo } from '../model/todo'
import ModelRepository, { type ID } from '../repository/repository'
import InMemoryStorage from '../storage/inmemory'

export interface TodoData {
  text: string
  id: ID
  done: boolean
  skip: boolean
}

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
  return new Todo(data.text ?? randomData.text, data.done ?? randomData.done, data.skip ?? randomData.skip, data.id ?? randomData.id)
}

export function todoArrayFactory (n: number): Todo[] {
  // generate n random todos
  return [...Array(n).keys()].map(() => todoFactory({}))
}

export function repositoryFactory (data?: Todo[]): ModelRepository<Todo> {
  const repository = new ModelRepository(Todo, new InMemoryStorage())
  if (data !== null) {
    data?.forEach(e => repository.add(e))
  }
  return repository
}
