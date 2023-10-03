export type ID = number;

export class Todo {
  public text: string;
  public done: boolean;
  public skip: boolean;
  public id: ID;

  constructor(t: string, id?: ID) {
    this.text = t;
    this.done = false;
    this.skip = false;
    this.id = id || +new Date();
  }

  public static clone(text: string, done: boolean, skip: boolean, id: ID) {
	const newTodo = new Todo(text, id); 
	newTodo.done = done;
	newTodo.skip = skip;
	return newTodo;
  }

  public toggleDone(): void {
	this.done = !this.done;
  }

  public toggleSkip(): void {
	this.skip = !this.skip;
  }
}
