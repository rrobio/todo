import { type IStorage, type ID, nextID } from '../repository/repository'

export default class LocalStorage implements IStorage {
  private readonly storageKey: string

  constructor (name: string) {
    this.storageKey = `localstoragerepository#${name}`
  }

  private getLocalStorage (): Map<number, unknown> {
    return new Map(JSON.parse(localStorage.getItem(this.storageKey) ?? '[]'))
  }

  private saveLocalStorage (data: Map<number, unknown>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(Array.from(data.entries())))
  }

  public getAll (): unknown[] {
    const data = this.getLocalStorage()
    return [...data.values()]
  }

  public get (id: number): unknown {
    return this.getLocalStorage().get(id)
  }

  public add (item: unknown, id?: number): number {
    if (id !== undefined) {
      const data = this.getLocalStorage()
      data.set(id, item)
      this.saveLocalStorage(data)
      return id
    } else {
      const nextFree = this.nextFree()
      return this.add(item, nextFree)
    }
  }

  private nextFree (): ID {
    const keys = [...this.getLocalStorage().keys()]
    if (keys.length === 0) {
      return nextID()
    }
    const newKey = nextID(keys[keys.length - 1])
    return newKey
  }

  public remove (id: ID): boolean {
    const data = this.getLocalStorage()
    if (data.delete(id)) {
      this.saveLocalStorage(data)
      return true
    }
    return false
  }

  public removeBy (compareFn: (other: unknown) => boolean): boolean {
    const data = this.getLocalStorage()
    for (const [key, value] of data) {
      if (compareFn(value)) {
        const ret = data.delete(key)
        this.saveLocalStorage(data)
        return ret
      }
    }
    return false
  }

  public set (id: number, item: unknown): boolean {
    const data = this.getLocalStorage()
    data.set(id, item)
    this.saveLocalStorage(data)
    return true
  }

  public setBy (item: unknown, compareFn: (other: unknown) => boolean): boolean {
    const data = this.getLocalStorage()
    for (const [index, value] of data) {
      if (compareFn(value)) {
        data.set(index, item)
        this.saveLocalStorage(data)
        return true
      }
    }
    // not in storage
    this.add(item)
    return true
  }
}
