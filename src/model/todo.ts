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
      this.text = data.text ?? 'empty'
      this.id = data.id ?? +new Date()
      this.done = data.done ?? false
      this.skip = data.skip ?? false
    } else {
      this.text = data
      this.id = id ?? +new Date()
      this.done = false
      this.skip = false
    }
  }

  public same (other: Todo): boolean {
    return this.id === other.id
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

  public static import (td: TodoData): Todo {
    return Todo.clone(td.text, td.done, td.skip, td.id)
  }

  public toggleDone (): void {
    this.done = !this.done
  }

  public toggleSkip (): void {
    this.skip = !this.skip
  }
}
