import { type ID } from '../repository/repository'

export class Todo {
  public text: string
  public id: ID
  public done: boolean
  public skip: boolean

  constructor (text: string, done: boolean, skip: boolean, id?: ID) {
    this.text = text
    this.id = id ?? +new Date()
    this.done = done
    this.skip = skip
  }

  public toggleDone (): void {
    this.done = !this.done
  }

  public toggleSkip (): void {
    this.skip = !this.skip
  }
}
