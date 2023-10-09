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

export default class ModelRepository<Value extends IHasID> {
  constructor (private readonly Base: IConstructor<Value>, private readonly storage: IStorage) {
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
