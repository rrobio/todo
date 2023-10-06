import type IRepository from './repository'
import { type ID, type IComapreID, type IConstructor } from './repository'

export default class LocalStorageRepository<T extends IComapreID> implements IRepository<T> {
  private readonly storageKey: string = 'todos'

  constructor (private readonly Base: IConstructor<T>) {
    this.storageKey = `localstoragerepository#${Base.name}`
  }

  public getBaseTypeName (): string {
    return this.Base.name
  }

  private getJSON (): string | null {
    return localStorage.getItem(this.storageKey)
  }

  public getAll (): T[] {
    const jsondata = this.getJSON()
    if (typeof jsondata === 'string') {
      const data = JSON.parse(jsondata)
      return data.map((e: unknown) => new this.Base(e))
    }
    return []
  }

  public get (id: ID): T | null {
    const jsonData = this.getJSON()
    if (typeof jsonData === 'string') {
      const items = JSON.parse(jsonData)
      const index = items.findIndex((e: IComapreID) => e.id === id)
      if (index >= 0) {
        return new this.Base(items[index])
      }
    }
    return null
  }

  public add (item: T): boolean {
    const items = this.getAll() ?? []
    items.push(item)
    this.setAll(items)
    return true
  }

  public remove (item: T): boolean {
    const items = this.getAll() ?? []
    const index = items.findIndex((e: IComapreID) => item.sameID(e.id))
    if (index >= 0) {
      items.splice(index, 1)
      this.setAll(items)
      return true
    }
    return false
  }

  public setAll (items: T[]): void {
    const todoJSON = JSON.stringify(items)
    localStorage.setItem(this.storageKey, todoJSON)
  }

  public set (item: T): void {
    const jsonData = this.getJSON()
    if (typeof jsonData === 'string') {
      const itemData: T[] = JSON.parse(jsonData)
      const index = itemData.findIndex(e => e.sameID(item.getID()))
      if (index >= 0) { // update existing
        itemData[index] = item
        localStorage.setItem(this.storageKey, JSON.stringify(itemData))
      } else { // push back new
        itemData.push(item)
        localStorage.setItem(this.storageKey, JSON.stringify(itemData))
      }
    } else {
      // empty local storage
      localStorage.setItem(this.storageKey, JSON.stringify([item]))
    }
  }
}
