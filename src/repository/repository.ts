export type ID = number
export type IConstructor<T> = new (...args: any[]) => T
export interface IComapreID {
  sameID: (other: ID) => boolean
  getID: () => ID
}

export default interface IRepository<T> {
  getBaseTypeName: () => string
  getAll: () => T[]
  get: (id: ID) => T | null
  add: (item: T) => boolean
  remove: (item: T) => boolean
  setAll: (all: T[]) => void
  set: (item: T) => void
}

export class Repository<T> {
  constructor (private readonly storage: IRepository<T>) {
  }

  public getBaseTypeName (): string {
    return this.storage.getBaseTypeName()
  }

  getAll (): T[] {
    return this.storage.getAll()
  }

  get (id: ID): T | null {
    return this.storage.get(id)
  }

  add (item: T): boolean {
    return this.storage.add(item)
  }

  remove (item: T): boolean {
    return this.storage.remove(item)
  }

  setAll (all: T[]): void {
    this.storage.setAll(all)
  }

  set (item: T): void {
    this.storage.set(item)
  }
}
