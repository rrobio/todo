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

abstract class Repository<T> {
  abstract getAll (): T[]
  abstract get (id: ID): T | null
  abstract getBy (compareFn: (other: T) => boolean): T | null
  abstract add (item: T): ID
  abstract remove (item: T): boolean
  abstract set (item: T): boolean
}

// for data types with no constructors
export class SimpleRepository<Value> extends Repository<Value> {
  constructor (private readonly storage: IStorage) {
    super()
  }

  getAll (): Value[] {
    return this.storage.getAll() as Value[]
  }

  get (id: number): Value | null {
    return this.storage.get(id) as Value
  }

  getBy (compareFn: (other: Value) => boolean): Value | null {
    const ret = this.storage.getBy(compareFn)
    if (ret === null) return null
    return ret as Value
  }

  add (item: Value): number {
    return this.storage.add(item)
  }

  remove (item: Value): boolean {
    return this.storage.removeBy((other: Value) => {
      return item === other
    })
  }

  set (item: Value, id?: ID): boolean {
    if (id === undefined) {
      return false
    } else {
      return this.storage.set(id, item)
    }
  }
}

export default class ModelRepository<Value extends IHasID> extends Repository<Value> {
  constructor (private readonly Base: IConstructor<Value>, private readonly storage: IStorage) {
    super()
  }

  public getAll (): Value[] {
    const data = this.storage.getAll()
    return data.map(d => Object.assign(new this.Base(), d))
  }

  public get (id: ID): Value | null {
    const got = this.storage.get(id)
    if (got !== null) {
      return Object.assign(new this.Base(), got)
    }
    return null
  }

  getBy (compareFn: (other: Value) => boolean): Value | null {
    const ret = this.storage.getBy(compareFn)
    if (ret === null) return null
    return Object.assign(new this.Base(), ret)
  }

  public add (item: Value): ID {
    return this.storage.add(item, item.id)
  }

  public remove (item: Value): boolean {
    return this.storage.remove(item.id)
  }

  public set (item: Value): boolean {
    return this.storage.set(item.id, item)
  }
}
