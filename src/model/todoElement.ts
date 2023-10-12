import render from '../templates/template.ts'
import { type Todo } from './todo.ts'
import todoTemplate from './todoTemplate.html?raw'

// function generateButton (todo: Todo, type: string): HTMLSpanElement {
//   const input = document.createElement('button')
//   const label = document.createElement('label')
//   input.setAttribute('type', 'button')
//   input.setAttribute('value', `${todo.id?.toString()}`)
//   input.setAttribute('id', `${type}-button#${todo.id?.toString()}`)
//   input.textContent = 'X'
//   input.addEventListener('click', function (event) {
//     event.preventDefault()
//     const deleteEvent = new Event('deleteTodo', { bubbles: true })
//     event.target?.dispatchEvent(deleteEvent)
//   })
//   label.setAttribute('for', `${type}-button#${todo.id?.toString()}`)
//   label.textContent = `${type}`
//   const span = document.createElement('span')
//   span.appendChild(input)
//   span.appendChild(label)
//   return span
// }

// function generateCheck (todo: Todo, type: string): HTMLSpanElement {
//   const span = document.createElement('span')
//   const input = document.createElement('input')
//   const label = document.createElement('label')
//   input.setAttribute('type', 'checkbox')
//   input.setAttribute('id', `${type}-button#${todo.id?.toString()}`)
//   input.setAttribute('value', `${todo.id?.toString()}`)

//   if (type === 'done' && todo.done) {
//     input.checked = true
//   }

//   if (type === 'skip' && todo.skip) {
//     input.checked = true
//   }
//   input.addEventListener('click', (event) => {
//     event.preventDefault()
//     const todoEvent = new Event(type === 'done' ? 'toggleTodo' : 'toggleSkip', { bubbles: true })
//     event.target?.dispatchEvent(todoEvent)
//   })
//   label.setAttribute('for', `${type}-button#${todo.id?.toString()}`)
//   label.textContent = `${type}`

//   span.appendChild(input)
//   span.appendChild(label)
//   return span
// }

// export default function generateNode (todo: Todo): HTMLDivElement {
//   const todoNode = document.createElement('div')
//   let nodeClass = 'todo'

//   if (todo.done) nodeClass += ' todo-done'

//   if (todo.skip) nodeClass += ' todo-skip'
//   todoNode.setAttribute('class', nodeClass)

//   const toggleButton = generateCheck(todo, 'done')
//   const skipButton = generateCheck(todo, 'skip')
//   const deleteButton = generateButton(todo, 'delete')

//   const text = document.createElement('p')
//   text.textContent = todo.text

//   todoNode.appendChild(toggleButton)
//   todoNode.appendChild(skipButton)
//   todoNode.appendChild(deleteButton)
//   todoNode.appendChild(text)

//   return todoNode
// }

export default function generateNode (todo: Todo): string {
  return render(todo, todoTemplate)
}
