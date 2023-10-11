export type ID = number
export function nextID (id?: ID): ID { // helper function za sljedeci moguci id, ovo je trivijalno za number ali moze se promijeniti ako je string ili symbol
  if (id === undefined) {
    return 0
  } else {
    return id + 1
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IConstructor<T> = new (...args: any[]) => T
export interface IHasID {
  id: ID
}

export interface IStorage {
  getAll: () => unknown[]
  get: (id: ID) => unknown | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getBy: (compareFn: (other: any) => boolean) => unknown | null
  add: (item: unknown, id?: ID) => ID
  remove: (id: ID) => boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeBy: (compareFn: (other: any) => boolean) => boolean
  set: (id: ID, item: unknown) => boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setBy: (item: unknown, compareFn: (other: any) => boolean) => boolean
}

export abstract class Repository<T> {
  abstract getAll (): T[]
  abstract get (id: number): T | null
  abstract add (item: T): number
  abstract remove (item: T): boolean
  abstract set (item: T): boolean
}
