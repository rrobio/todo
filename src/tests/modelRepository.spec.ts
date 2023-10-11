/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Todo } from '../model/todo'
import ModelRepository from '../repository/ModelRepository'
import InMemoryStorage from '../storage/inmemory'
import { todoArrayFactory, todoFactory } from './helpers'

export function IDAndRepositroyFactory (data?: Todo[]): [number[], ModelRepository<Todo>] {
  const repository = new ModelRepository(Todo, new InMemoryStorage())
  const ids: number[] = []
  if (data !== null) {
    data?.forEach(e => ids.push(repository.add(e)))
  }
  return [ids, repository]
}

describe('ModelRepositroy', () => {
  describe('instantiate repository', () => {
    test('create repository with mockdatabase', () => {
      const [ids, repository] = IDAndRepositroyFactory()
      expect(ids.length).toBe(0)
      expect(repository).not.toBeNull()
    })
  })
  describe('setting todos', () => {
    test('should set all todos', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      ids.forEach(id => {
        const todo = repository.get(id)
        expect(todo).not.toBeNull()
        expect(todo?.id).not.toBeUndefined()
      })
    })
    test('should set specific', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))

      const todo = repository.get(ids[0])
      expect(todo).not.toBeNull()
      // change a todo
      todo?.toggleDone()
      repository.set(todo!)

      expect(todo).toStrictEqual(repository.get(todo!.id))
    })
  })
  describe('getting todos', () => {
    test('should get all todos', () => {
      const nTodos = 5
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(nTodos))

      const todos = repository.getAll()
      expect(todos.length).toBe(nTodos)
      expect(ids.length).toBe(nTodos)
    })
    test('should get specific', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))

      const gotTodo = repository.get(ids[0])

      expect(gotTodo).not.toBeNull()
    })
    test('should fail to get nonexistent', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      expect(ids.length).toBe(5)

      const gotTodo = repository.get(-1)
      expect(gotTodo).toBeNull()
    })
    test('should return false when getting with undefined id', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      expect(ids.length).toBe(5)
      expect(repository.getAll().length).toBe(5)
      expect(repository.get(undefined)).toBe(null)
    })
  })
  describe('setting todos', () => {
    test('set all', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      expect(ids.length).toBe(5)
      expect(repository.getAll().length).toBe(5)
    })
    test('should set a todo', () => {
      // add 5 random todos
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      expect(ids).not.toBeNull()
      expect(repository.getAll().length).toBe(5)
      // get the first todo
      const todo = repository.get(ids[0])
      expect(todo).not.toBeNull()
      expect(repository.get(todo?.id)).toStrictEqual(todo)
      // update todo
      todo!.toggleDone()
      todo!.toggleSkip()

      // set in repository
      repository.set(todo!)
      expect(repository.getAll().length).toBe(5)
      expect(repository.get(todo!.id)).not.toBeNull()
      expect(repository.get(todo!.id)).toStrictEqual(todo)
    })
    test('should fail when setting on empty repository', () => {
      const [ids, repository] = IDAndRepositroyFactory()
      expect(ids).not.toBeNull()
      expect(repository.getAll().length).toBe(0)
      const todo = todoFactory({})
      expect(repository.set(todo)).toBe(false)
      expect(repository.getAll().length).toBe(0)
    })
    test('should fail when setting with undefinde id', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      expect(ids).not.toBeNull()
      expect(repository.getAll().length).toBe(5)
      expect(repository.set(new Todo('test'))).toBe(false)
      expect(repository.getAll().length).toBe(5)
    })
  })
  describe('adding a todo', () => {
    test('should add 5 todo', () => {
      const [ids, repository] = IDAndRepositroyFactory()
      expect(ids).not.toBeNull()
      for (let i = 0; i < 5; i++) {
        repository.add(todoFactory({}))
      }

      const todos = repository.getAll()
      expect(todos.length).toStrictEqual(5)
    })
    test('should add a todo', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      expect(ids).not.toBeNull()
      const todo = todoFactory({})
      const id = repository.add(todo)

      const got = repository.get(id)
      expect(got?.text).toStrictEqual(todo.text)
      expect(got?.done).toStrictEqual(todo.done)
      expect(got?.skip).toStrictEqual(todo.skip)
      expect(got?.id).toStrictEqual(id)
    })
  })
  describe('reomving a todo', () => {
    test('should remove a todo', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      expect(ids).not.toBeNull()
      expect(repository.getAll()?.length).toStrictEqual(5)
      repository.remove(repository.get(ids[0])!)
      expect(repository.getAll()?.length).toStrictEqual(4)
    })
    test('should fail to remove a nonexistent todo', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      expect(ids).not.toBeNull()
      expect(repository.getAll()?.length).toStrictEqual(5)
      expect(repository.remove(new Todo('asd', false, false, -1))).toBe(false)
      expect(repository.getAll()?.length).toBe(5)
    })
    test('should fail when removing with undefinde id', () => {
      const [ids, repository] = IDAndRepositroyFactory(todoArrayFactory(5))
      expect(ids).not.toBeNull()
      expect(repository.getAll().length).toBe(5)
      expect(repository.remove(new Todo('test'))).toBe(false)
      expect(repository.getAll().length).toBe(5)
    })
  })
})
