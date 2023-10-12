// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyAllSubstitutions (template: string, context: any): string {
  Object.entries(context).forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template = template.replaceAll('{{' + key + '}}', value as any)
  })
  return template
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function render (template: string, context: any, ...contexts: any[]): string {
  context = Object.assign(context, ...contexts)
  return applyAllSubstitutions(template, context)
}
