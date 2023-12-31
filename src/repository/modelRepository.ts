import Repository from './irepository'
import type IStorage from '../storage/istorage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IConstructor<T> = new (...args: any[]) => T

export default class ModelRepository<Value extends { id?: number } > extends Repository<Value> {
  constructor (private readonly Base: IConstructor<Value>, private readonly storage: IStorage) {
    super()
  }

  public getAll (): Value[] {
    const data = this.storage.getAll()
    return data.map(d => Object.assign(new this.Base(), d[1], { id: d[0] }))
  }

  public get (id?: number): Value | null {
    if (id !== undefined) {
      const got = this.storage.get(id)
      if (got !== null) {
        return Object.assign(new this.Base(), got, { id })
      }
    }
    return null
  }

  public add (item: Value): number {
    const id = this.storage.add(item)
    item.id = id
    return id
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
