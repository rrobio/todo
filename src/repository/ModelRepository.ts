import Repository from './repository'
import type IStorage from '../storage/storage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IConstructor<T> = new (...args: any[]) => T

export default class ModelRepository<Value extends { id?: number } > extends Repository<Value> {
  constructor (private readonly Base: IConstructor<Value>, private readonly storage: IStorage) {
    super()
  }

  public getAll (): Value[] {
    const data = this.storage.getAll()
    return data.map(d => Object.assign(new this.Base(), d))
  }

  public get (id: number): Value | null {
    const got = this.storage.get(id)
    if (got !== null) {
      return Object.assign(new this.Base(), got)
    }
    return null
  }

  public add (item: Value): number {
    return this.storage.add(item, item.id)
  }

  public remove (item: Value): boolean {
    if (item.id === undefined) {
      return false
    } else {
      return this.storage.remove(item.id)
    }
  }

  public set (item: Value): boolean {
    if (item.id === undefined) {
      return false
    } else {
      return this.storage.set(item.id, item)
    }
  }
}
