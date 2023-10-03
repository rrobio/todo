export type ID = number

export interface TodoData {
  text: string
  done: boolean
  skip: boolean
  id: ID
}

export class Todo implements TodoData {
  public text: string
  public done: boolean
  public skip: boolean
  public id: ID

  constructor (text: string, id?: ID) {
    this.text = text
    this.done = false
    this.skip = false
    this.id = id ?? +new Date()
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
