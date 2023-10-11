import { Todo } from '../model/todo'
import ModelRepository from '../repository/ModelRepository'
import InMemoryStorage from '../storage/inmemory'
import { todoArrayFactory, todoFactory } from './helpers'

export function repositoryFactory (data?: Todo[]): ModelRepository<Todo> {
  const repository = new ModelRepository(Todo, new InMemoryStorage())
  if (data !== null) {
    data?.forEach(e => repository.add(e))
  }
  return repository
}

describe('ModelRepositroy', () => {
  describe('instantiate repository', () => {
    test('create repository with mockdatabase', () => {
      const repository = repositoryFactory()
      expect(repository).not.toBeNull()
    })
  })
  describe('setting todos', () => {
    test('should set all todos', () => {
      const todos = todoArrayFactory(5)
      const repository = repositoryFactory(todos)
      todos.forEach(e => {
        const todo = repository.get(e.id ?? -1) // FIXME:
        expect(todo).not.toBeNull()
        expect(todo).toStrictEqual(e)
      })
    })
    test('should set specific', () => {
      const todos = todoArrayFactory(5)
      const repository = repositoryFactory(todos)

      // change a todo
      todos[0].toggleDone()
      repository.set(todos[0])

      repository.getAll()?.forEach((e: Todo, i: number) => {
        expect(todos[i]).toStrictEqual(e)
      })
    })
  })
  describe('getting todos', () => {
    test('should get all todos', () => {
      const nTodos = 5
      const repository = repositoryFactory(todoArrayFactory(nTodos))
      const todos = repository.getAll()
      expect(todos.length).toBe(nTodos)
    })
    test('should get specific', () => {
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = repositoryFactory(todos)

      const gotTodo = repository.get(todos[0].id ?? -1)
      expect(gotTodo).not.toBeNull()
      expect(gotTodo).toStrictEqual(todos[0])
    })
    test('get nonexistent', () => {
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = repositoryFactory(todos)

      const gotTodo = repository.get(todoFactory({ id: -1 }).id ?? -1)
      expect(gotTodo).toBeNull()
    })
  })
  describe('setting todos', () => {
    test('set all', () => {
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = repositoryFactory(todos)
      expect(repository.getAll().length).toBe(nTodos)
    })
    test('should set a todo', () => {
      // add 5 random todos
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = repositoryFactory(todos)
      expect(repository.getAll().length).toBe(nTodos)
      // get the first todo
      const todo = repository.get(todos[0].id ?? -1)
      expect(todo).not.toBeNull()
      if (todo === null) {
        fail('it should not reach here')
      } else {
        expect(repository.get(todo.id ?? -1)).toStrictEqual(todo)
        // update todo
        todo.toggleDone()
        todo.toggleSkip()

        // set in repository
        repository.set(todo)
        expect(repository.getAll().length).toBe(nTodos)
        expect(repository.get(todo.id ?? -1)).not.toBeNull()
        expect(repository.get(todo.id ?? -1)).toStrictEqual(todo)
      }
    })
    test('should fail when setting on empty repository', () => {
      const repository = repositoryFactory()
      expect(repository.getAll().length).toBe(0)
      const todo = todoFactory({})
      expect(repository.set(todo)).toBe(false)
      expect(repository.getAll().length).toBe(0)
    })
    test('should fail when setting with undefinde id', () => {
      const repository = repositoryFactory(todoArrayFactory(5))
      expect(repository.getAll().length).toBe(5)
      expect(repository.set(new Todo('test'))).toBe(false)
      expect(repository.getAll().length).toBe(5)
    })
  })
  describe('adding a todo', () => {
    test('should add 5 todo', () => {
      const repository = repositoryFactory()
      for (let i = 0; i < 5; i++) {
        const newTodo = todoFactory({})
        repository.add(newTodo)
      }

      const todos = repository.getAll()
      expect(todos.length).toStrictEqual(5)
    })
    test('should add a todo', () => {
      const nTodos = 5
      const repository = repositoryFactory(todoArrayFactory(nTodos))
      const newTodo = todoFactory({})
      repository.add(newTodo)

      const todos = repository.getAll()
      expect(todos[todos.length - 1]).toStrictEqual(newTodo)
    })
  })
  describe('reomving a todo', () => {
    test('should remove a todo', () => {
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = repositoryFactory(todos)
      expect(repository.getAll()?.length).toStrictEqual(5)
      repository.remove(todos[0])
      expect(repository.getAll()?.length).toStrictEqual(4)
    })
    test('should fail to remove a nonexistent todo', () => {
      const repository = repositoryFactory(todoArrayFactory(5))
      expect(repository.getAll()?.length).toStrictEqual(5)
      expect(repository.remove(new Todo('asd', false, false, -1))).toBe(false)
      expect(repository.getAll()?.length).toBe(5)
    })
    test('should fail when removing with undefinde id', () => {
      const repository = repositoryFactory(todoArrayFactory(5))
      expect(repository.getAll().length).toBe(5)
      expect(repository.remove(new Todo('test'))).toBe(false)
      expect(repository.getAll().length).toBe(5)
    })
  })
})