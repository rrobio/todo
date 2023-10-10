import { faker } from '@faker-js/faker'
import { SimpleRepository } from '../repository/repository'
import InMemoryStorage from '../storage/inmemory'

function randomArray (n: number): number[] {
  return [...Array(n).keys()].map(() => faker.number.int())
}

function repositoryFactory (data?: number[]): SimpleRepository<number> {
  const repository = new SimpleRepository<number>(new InMemoryStorage())
  if (data !== null) {
    data?.forEach(e => repository.add(e))
  }
  return repository
}
describe('SimpleRepositroy', () => {
  describe('instantiate repository', () => {
    test('create repository with mockdatabase', () => {
      const repository = repositoryFactory()
      expect(repository).not.toBeNull()
    })
  })
  describe('setting', () => {
    test('should set all', () => {
      const numbers = randomArray(5)
      const repository = repositoryFactory(numbers)
      expect(repository).not.toBeNull()
      expect(repository.getAll().length).toBe(5)
    })
    test('should set specific', () => {
      const numbers = randomArray(5)
      const repository = repositoryFactory(numbers)
      expect(repository.getAll().length).toBe(5)

      const id = repository.add(234)
      expect(repository.getAll().length).toBe(6)

      repository.set(555, id)
      expect(repository.getAll().length).toBe(6)
      const data = repository.getAll()
      expect(data.includes(555)).toBe(true)
    })
  })
  describe('getting values', () => {
    test('should get all values', () => {
      const nofnumbers = 5
      const repository = repositoryFactory(randomArray(nofnumbers))
      const numbers = repository.getAll()
      expect(numbers.length).toBe(nofnumbers)
    })
    test('should get specific', () => {
      const a = { foo: 'bar' }
      const b = { foo: 'baz' }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const repository = new SimpleRepository<any>(new InMemoryStorage())
      const ia = repository.add(a)
      const ib = repository.add(b)
      void ib
      expect(repository.getAll().length).toBe(2)
      expect(repository.get(ia)).toStrictEqual(a)
    })
    test('should get null on nonexistent id', () => {
      const repository = repositoryFactory(randomArray(10))

      const gotTodo = repository.get(-1)
      expect(gotTodo).toBeNull()
    })
    test('should get with comparison function', () => {
      const repository = repositoryFactory(randomArray(10))
      expect(repository.getBy(a => a > 0)).not.toBeNull()
    })
    test('should fail with comparison function', () => {
      const repository = repositoryFactory(randomArray(10))
      expect(repository.getBy(() => false)).toBeNull()
    })
  })
  describe('setting values', () => {
    test('should add new when setting on empty repository', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const repository = new SimpleRepository<any>(new InMemoryStorage())
      expect(repository.getAll().length).toBe(0)
      repository.set({}, -1)
      expect(repository.getAll().length).toBe(1)
    })
    test('should faile to set a value with an invalid id', () => {
      const repository = repositoryFactory()
      repository.add(123)
      expect(repository.set(111, undefined)).toBe(false)
      expect(repository.getAll().length).toBe(1)
    })
  })
  describe('adding values', () => {
    test('should add 5 values', () => {
      const repository = repositoryFactory()
      for (let i = 0; i < 5; i++) {
        const num = faker.number.int()
        repository.add(num)
      }
      const todos = repository.getAll()
      expect(todos.length).toStrictEqual(5)
    })
    test('should add a value', () => {
      const repository = repositoryFactory(randomArray(50))
      repository.add(999)

      const numbers = repository.getAll()
      expect(numbers[numbers.length - 1]).toStrictEqual(999)
    })
  })
  describe('reomving a todo', () => {
    test('should remove a todo', () => {
      const repository = repositoryFactory(randomArray(5))
      expect(repository.getAll()?.length).toStrictEqual(5)
      const num = repository.getAll()[0]
      repository.remove(num)
      expect(repository.getAll()?.length).toStrictEqual(4)
    })
    test('should fail to remove a nonexistent todo', () => {
      const repository = repositoryFactory(randomArray(10))
      expect(repository.getAll()?.length).toStrictEqual(10)
      expect(repository.remove(-111)).toBe(false)
      expect(repository.getAll()?.length).toBe(10)
    })
  })
})
