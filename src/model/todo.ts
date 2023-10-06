import { type ID } from '../repository/repository'

export interface TodoData {
  text: string
  id: ID
  done: boolean
  skip: boolean
}

export class Todo implements TodoData {
  public text: string
  public id: ID
  public done: boolean
  public skip: boolean

  constructor (data: TodoData)
  constructor (data: string, id?: ID)
  constructor (data: TodoData | string, id?: ID) {
    if (typeof data === 'object') {
      this.text = data.text
      this.id = data.id
      this.done = data.done
      this.skip = data.skip
    } else {
      this.text = data
      this.id = id ?? +new Date()
      this.done = false
      this.skip = false
    }
  }

  public getID (): ID {
    return this.id
  }

  public sameID (other: ID): boolean {
    return this.id === other
  }

  public static clone (text: string, done: boolean, skip: boolean, id: ID): Todo {
    const newTodo = new Todo(text, id)
    newTodo.done = done
    newTodo.skip = skip
    return newTodo
  }

  public export (): TodoData {
    return this as TodoData
  }

  public toggleDone (): void {
    this.done = !this.done
  }

  public toggleSkip (): void {
    this.skip = !this.skip
  }
}
