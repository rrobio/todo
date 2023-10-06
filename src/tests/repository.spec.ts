import MockDatabase from '../repository/mockdatabase.ts'
import { Repository } from '../repository/repository.ts'
import { Todo } from '../model/todo.ts'
import { todoArrayFactory, todoFactory } from './helpers.ts'

describe('Repositroy', () => {
  describe('instantiate repository', () => {
    test('create repository with mockdatabase', () => {
      const repository = new Repository(new MockDatabase(Todo))
      expect(repository).not.toBeNull()
      expect(repository.getBaseTypeName()).toBe('Todo')
    })
  })
  describe('setting todos', () => {
    test('should set all todos', () => {
      const repository = new Repository(new MockDatabase(Todo))
      const todos = todoArrayFactory(5)
      repository.setAll(todos)
      repository.getAll()?.forEach((e: Todo, i: number) => {
        expect(todos[i]).toStrictEqual(e)
      })
    })
    test('should set specific', () => {
      const repository = new Repository(new MockDatabase(Todo))
      const todos = todoArrayFactory(5)
      repository.setAll(todos)

      // change a todo
      todos[0] = todoFactory({})
      repository.set(todos[0])

      repository.getAll()?.forEach((e: Todo, i: number) => {
        expect(todos[i]).toStrictEqual(e)
      })
    })
  })
  describe('getting todos', () => {
    test('should get all todos', () => {
      const nTodos = 5
      const repository = new Repository(new MockDatabase(Todo, todoArrayFactory(nTodos)))
      const todos = repository.getAll() ?? []
      expect(todos.length).toBe(nTodos)
    })
    test('should get specific', () => {
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = new Repository(new MockDatabase(Todo, todos))

      const gotTodo = repository.get(todos[0].getID())
      expect(gotTodo).not.toBeNull()
      expect(gotTodo).toStrictEqual(todos[0])
    })
    test('get nonexistent', () => {
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = new Repository(new MockDatabase(Todo, todos))

      const gotTodo = repository.get(todoFactory({}).id)
      expect(gotTodo).toBeNull()
    })
  })
  describe('setting todos', () => {
    test('set all', () => {
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = new Repository(new MockDatabase(Todo))
      repository.setAll(todos)
      expect(repository.getAll().length).toBe(nTodos)
    })
    test('should set a todo', () => {
      // add 5 random todos
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = new Repository(new MockDatabase(Todo))
      repository.setAll(todos)
      expect(repository.getAll().length).toBe(nTodos)
      // get the first todo
      const todo = repository.get(todos[0].id)
      expect(todo).not.toBeNull()
      if (todo === null) {
        fail('it should not reach here')
      } else {
        expect(repository.get(todo.id)).toBe(todo)
        // update todo
        todo.toggleDone()
        todo.toggleSkip()

        // set in repository
        repository.set(todo)
        expect(repository.getAll().length).toBe(nTodos)
        expect(repository.get(todo.id)).not.toBeNull()
        expect(repository.get(todo.id)).toStrictEqual(todo)
      }
    })
    test('should add new when setting on empty repository', () => {
      const repository = new Repository(new MockDatabase(Todo))
      expect(repository.getAll().length).toBe(0)
      const todo = todoFactory({})
      repository.set(todo)
      expect(repository.getAll().length).toBe(1)
      expect(repository.get(todo.id)).toStrictEqual(todo)
    })
    test('should pushback new', () => {
      const repository = new Repository(new MockDatabase(Todo))
      repository.set(todoFactory({}))
      expect(repository.getAll().length).toBe(1)
      const todo = todoFactory({})
      repository.set(todo)
      expect(repository.getAll().length).toBe(2)
      expect(repository.get(todo.id)).toStrictEqual(todo)
    })
  })
  describe('adding a todo', () => {
    test('should add 5 todo', () => {
      const repository = new Repository(new MockDatabase(Todo))
      for (let i = 0; i < 5; i++) {
        const newTodo = todoFactory({})
        repository.add(newTodo)
      }

      const todos = repository.getAll() ?? []
      expect(todos.length).toStrictEqual(5)
    })
    test('should add a todo', () => {
      const nTodos = 5
      const repository = new Repository(new MockDatabase(Todo, todoArrayFactory(nTodos)))
      const newTodo = todoFactory({})
      repository.add(newTodo)

      const todos = repository.getAll() ?? []
      expect(todos[todos.length - 1]).toStrictEqual(newTodo)
    })
  })
  describe('reomving a todo', () => {
    test('should remove a todo', () => {
      const nTodos = 5
      const todos = todoArrayFactory(nTodos)
      const repository = new Repository(new MockDatabase(Todo, todos))
      expect(repository.getAll()?.length).toStrictEqual(5)
      repository.remove(todos[0])
      expect(repository.getAll()?.length).toStrictEqual(4)
    })
    test('should fail to remove a nonexistent todo', () => {
      const repository = new Repository(new MockDatabase(Todo, todoArrayFactory(5)))
      expect(repository.getAll()?.length).toStrictEqual(5)
      expect(repository.remove(new Todo('asd', -1))).toBe(false)
      expect(repository.getAll()?.length).toBe(5)
    })
  })
})
