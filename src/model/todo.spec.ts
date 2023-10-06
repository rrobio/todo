import { Todo, type TodoData } from './todo.ts'
import { faker } from '@faker-js/faker'
import MockDatabase from '../repository/mockdatabase.ts'
import { Repository } from '../repository/repository.ts'

function getRandomTodoData (): TodoData {
  return {
    text: faker.lorem.lines(2),
    id: +faker.date.anytime(),
    done: faker.datatype.boolean(),
    skip: faker.datatype.boolean()
  }
}

function todoFactory (data: Partial<TodoData>): Todo {
  const randomData = getRandomTodoData()
  return Todo.clone(data.text ?? randomData.text, data.done ?? randomData.done, data.skip ?? randomData.skip, data.id ?? randomData.id)
}

function todoArrayFactory (n: number): Todo[] {
  // generate n random todos
  return [...Array(n).keys()].map(() => todoFactory({}))
}

describe('Todo creation', () => {
  test('should create new todo from data object', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data)
    expect(todo).toBeInstanceOf(Todo)
    expect(todo.text).toBe(data.text)
    expect(todo.id).toBe(data.id)
    expect(todo.done).toBe(data.done)
    expect(todo.skip).toBe(data.skip)
    expect(todo.id).not.toBeNull()
  })
  test('should create new todo from string and id', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data.text, data.id)
    expect(todo).toBeInstanceOf(Todo)
    expect(todo.text).toBe(data.text)
    expect(todo.id).toBe(data.id)
    expect(todo.done).toBe(false)
    expect(todo.skip).toBe(false)
  })
  test('should create new todo just from string', () => {
    const data = getRandomTodoData()
    const todo = new Todo(data.text)
    expect(todo).toBeInstanceOf(Todo)
    expect(todo.text).toBe(data.text)
    expect(todo.id).not.toBeNull()
    expect(todo.done).toBe(false)
    expect(todo.skip).toBe(false)
  })
})
describe('toggle Todo state', () => {
  test('should toggle done state', () => {
    const todo = todoFactory({ done: false })
    expect(todo.done).toBeFalsy()
    todo.toggleDone()
    expect(todo.done).toBeTruthy()
  })
  test('should toggle skip state', () => {
    const todo = todoFactory({ skip: false })
    expect(todo.skip).toBeFalsy()
    todo.toggleSkip()
    expect(todo.skip).toBeTruthy()
  })
})
describe('recreate Todo', () => {
  test('should clone todo', () => {
    const todo1 = todoFactory({})
    expect(todo1).toBeInstanceOf(Todo)
    todo1.toggleDone()
    const todo2 = Todo.clone(todo1.text, todo1.done, todo1.skip, todo1.id)
    expect(todo1.export()).toStrictEqual(todo2.export())
  })
  test('done state should not be equal', () => {
    const todo1 = todoFactory({})
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
    const todo = todoFactory(data)
    expect(todo.export().text).toBe(data.text)
    expect(todo.export().id).toBe(data.id)
  })
  test('export to json', () => {
    const data = getRandomTodoData()
    const todo = todoFactory(data)
    expect(JSON.stringify(todo.export())).toBe(JSON.stringify(data))
  })
  test('export to json (modified)', () => {
    const data = getRandomTodoData()
    const todo = todoFactory(data)
    expect(JSON.stringify(todo.export())).toBe(JSON.stringify(data))
    todo.toggleDone()
    expect(JSON.stringify(todo.export())).not.toBe(JSON.stringify(data))
  })
})
describe('import todo', () => {
  test('should import todo from tododata', () => {
    const data = getRandomTodoData()
    const todo = todoFactory(data)
    expect(todo.export()).toEqual(data)
  })
  test('import from json', () => {
    const data = getRandomTodoData()
    const todo = todoFactory(JSON.parse(JSON.stringify(data)))
    expect(todo.text).toBe(data.text)
    expect(todo.id).toBe(data.id)
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
describe('repository tests', () => {
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
