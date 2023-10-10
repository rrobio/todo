import { type IHasID, Repository, type IConstructor, type IStorage, type ID } from './repository'

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
