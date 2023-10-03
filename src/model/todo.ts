export type ID = number;

export interface TodoData {
    text: string;
    done: boolean;
    skip: boolean;
    id: ID;
}

export class Todo implements TodoData {
    public text: string;
    public done: boolean;
    public skip: boolean;
    public id: ID;

    constructor(text: string, id?: ID) {
        this.text = text;
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

    public export(): TodoData {
        return this as TodoData
    }

    public static import(td: TodoData): Todo {
        return Todo.clone(td.text, td.done, td.skip, td.id);
    }

    public toggleDone(): void {
        this.done = !this.done;
    }

    public toggleSkip(): void {
        this.skip = !this.skip;
    }

    private generateButton(type: string): HTMLSpanElement {
        const input = document.createElement('button');
        const label = document.createElement('label')
        input.setAttribute('type', 'button')
        input.setAttribute('value', `${this.id}`)
        input.setAttribute('id', `${type}-button#${this.id}`)
        input.textContent = 'X'
        input.addEventListener('click', function(event) {
            event.preventDefault()
            const deleteEvent = new Event('deleteTodo', { bubbles: true })
            event.target?.dispatchEvent(deleteEvent)
        })
        label.setAttribute('for', `${type}-button#${this.id}`)
        label.textContent = `${type}`
        const span = document.createElement('span')
        span.appendChild(input);
        span.appendChild(label);
        return span;
    }

    private generateCheck(type: string): HTMLSpanElement {
        const span = document.createElement('span')
        const input = document.createElement('input')
        const label = document.createElement('label')
        input.setAttribute('type', 'checkbox')
        input.setAttribute('id', `${type}-button#${this.id}`)
        input.setAttribute('value', this.id.toString())
        if (type == "done" && this.done) {
            input.checked = true
        }
        if (type == "skip" && this.skip) {
            input.checked = true
        }
        input.addEventListener('click', (event) => {
            event.preventDefault()
            const todoEvent = new Event(type === 'done' ? 'toggleTodo' : 'toggleSkip', { bubbles: true })
            event.target?.dispatchEvent(todoEvent)
        })
        label.setAttribute('for', `${type}-button#${this.id}`)
        label.textContent = `${type}`;

        span.appendChild(input);
        span.appendChild(label);
        return span;
    }


    public generateNode(): HTMLDivElement {
        const todoNode = document.createElement('div')
        todoNode.setAttribute('class', 'todo')

        const toggleButton = this.generateCheck("done");
        const skipButton = this.generateCheck("skip");
        const deleteButton = this.generateButton("delete");

        const text = document.createElement('p')
        text.textContent = this.text

        todoNode.appendChild(toggleButton)
        todoNode.appendChild(skipButton)
        todoNode.appendChild(deleteButton)
        todoNode.appendChild(text)

        return todoNode
    }
}
