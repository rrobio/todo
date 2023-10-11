export class Todo {
  public text: string
  public id?: number
  public done: boolean
  public skip: boolean

  constructor (text: string, done: boolean = false, skip: boolean = false, id?: number) {
    this.text = text
    this.id = id
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
