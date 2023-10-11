export default interface IStorage {
  getAll: () => unknown[]
  get: (id: number) => unknown | null
  add: (item: unknown) => number
  remove: (id: number) => boolean
  set: (id: number, item: unknown) => boolean
}
