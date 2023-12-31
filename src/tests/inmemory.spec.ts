/* eslint-disable @typescript-eslint/no-explicit-any */
import InMemoryStorage from '../storage/inmemory'
import { faker } from '@faker-js/faker'

function storageFactory (): [storage: InMemoryStorage, ids: number[]] {
  const storage = new InMemoryStorage()
  const ids: number[] = []
  for (let i = 0; i < 5; i++) {
    ids.push(storage.add({ foo: faker.lorem.words(5) }))
  }
  ids.push(storage.add({ foo: 'nesto', bar: true }))
  return [storage, ids]
}

describe('InMemoryStorage', () => {
  test('instantiate', () => {
    const storage = new InMemoryStorage()
    expect(storage).not.toBeNull()
    expect(storage).toBeInstanceOf(InMemoryStorage)
  })
  describe('adding to storage', () => {
    test('add with .add', () => {
      const storage = new InMemoryStorage()
      const id = storage.add({ foo: false })
      expect(id).not.toBeNull()
      expect(storage.get(id)).toStrictEqual({ foo: false })
    })
  })
  describe('getting from storage', () => {
    const storage = new InMemoryStorage()
    const ids: number[] = []
    const data = { foo: faker.lorem.words(5), bar: true }
    for (let i = 0; i < 5; i++) {
      ids.push(storage.add({ foo: faker.lorem.words(5) }))
    }
    const lastId = storage.add(data)
    ids.push(lastId)
    test('should get all from .getAll', () => {
      expect(storage.getAll().length).toBe(6)
    })
    test('should get a specific with id from .get', () => {
      expect(storage.get(ids[0])).not.toBeNull()
      expect(storage.get(ids[lastId])).toStrictEqual(data)
    })
  })
  describe('Removing elements', () => {
    let storage: InMemoryStorage, ids: number[]
    beforeEach(() => {
      [storage, ids] = storageFactory()
    })

    test('should remove one', () => {
      const before = storage.getAll().length
      expect(storage.remove(ids[0])).toBe(true)
      expect(storage.getAll().length).toBe(before - 1)
    })
  })
  describe('Setting elements', () => {
    let storage: InMemoryStorage, ids: number[]
    beforeEach(() => {
      [storage, ids] = storageFactory()
    })
    test('should set/update an existing element', () => {
      const id = ids[0]
      const element: any = storage.get(id)
      const before = storage.getAll().length
      expect(element).not.toBeNull()
      element.foo = 'asdf'
      expect(storage.set(id, element)).toBe(true)
      expect(storage.get(id)).toStrictEqual({ foo: 'asdf' })
      expect(storage.getAll().length).toBe(before)
    })
    test('should fail when setting an item that doesnt exist', () => {
      const element = { foo: 'asdf' }
      const before = storage.getAll().length
      expect(storage.set(+faker.date.anytime(), element)).toBe(false)
      expect(storage.getAll().length).toBe(before)
    })
  })
})
