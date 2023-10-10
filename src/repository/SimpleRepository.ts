import { Repository, type IStorage, type ID } from './repository'

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
