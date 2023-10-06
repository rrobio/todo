import type IRepository from './repository'
import { type IConstructor, type IComapreID, type ID } from './repository'

export default class MockDataRepository<T extends IComapreID> implements IRepository<T> {
  private storage: T[]

  constructor (private readonly Base: IConstructor<T>, items?: T[]) {
    this.storage = items ?? []
  }

  public getBaseTypeName (): string {
    return this.Base.name
  }

  public getAll (): T[] {
    return this.storage
  }

  public get (id: ID): T | null {
    const index = this.storage.findIndex(e => e.getID() === id)
    if (index >= 0) {
      return this.storage[index]
    }
    return null
  }

  public add (item: T): boolean {
    this.storage.push(item)
    return true
  }

  public remove (item: T): boolean {
    const index = this.storage.findIndex(e => item.sameID(e.getID()))
    if (index >= 0) {
      this.storage.splice(index, 1)
      return true
    }
    return false
  }

  public setAll (items: T[]): void {
    this.storage = items
  }

  public set (item: T): void {
    if (this.storage.length > 0) {
      const index = this.storage.findIndex(e => item.sameID(e.getID()))
      if (index >= 0) { // update existing
        this.storage[index] = item
      } else { // push back new
        this.storage.push(item)
      }
    } else {
      // empty storage
      this.storage = [item]
    }
  }
}
