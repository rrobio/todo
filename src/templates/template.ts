// {{     term   }}
// ^start ^value ^end
export interface Term {
  start: number
  end: number
  value: string
}

function findAllTerms (template: string): Term[] {
  let start = 0
  let end = 0

  const terms: Term[] = []
  while (true) {
    start = template.indexOf('{{', start)
    if (start === -1) {
      break
    }
    end = template.indexOf('}}', start)
    if (end === -1) {
      throw new SyntaxError('Term not closed starting at: ' + start)
    }

    terms.push({ start, end, value: template.slice(start + 2, end) })
    start++
  }

  return terms
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyAllTerms (context: any, terms: Term[], template: string): string {
  terms.forEach(term => {
    const value = context[term.value]
    if (value === undefined) {
      throw new SyntaxError('Term `' + term.value + '` not in context starting at: ' + term.start)
    }

    template = template.replace('{{' + term.value + '}}', value)
  })
  return template
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function render (context: any, template: string): string {
  const terms = findAllTerms(template)
  return applyAllTerms(context, terms, template)
}
