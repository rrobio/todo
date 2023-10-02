export class Todo {
	text: string;
	done: boolean;
	skip: boolean;
	id: string;

	constructor(content: string) {
		this.text = content;
		this.done = false;
		this.skip = false;
		this.id = crypto.randomUUID();
	}
}
