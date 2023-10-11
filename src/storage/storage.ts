export default interface IStorage {
  getAll: () => unknown[]
  get: (id: number) => unknown | null
  add: (item: unknown, id?: number) => number
  remove: (id: number) => boolean
  set: (id: number, item: unknown) => boolean
}
