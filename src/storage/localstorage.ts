import type IStorage from './storage'

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

  private nextFreeKey (): number {
    const keys = [...this.getLocalStorage().keys()]
    if (keys.length === 0) {
      return 0
    }
    return keys[keys.length - 1] + 1
  }

  public getAll (): Array<[number, unknown]> {
    const data = this.getLocalStorage()
    const ret = Array<[number, unknown]>()
    data.forEach((value, key) => ret.push([key, value]))
    return ret
  }

  public get (id: number): unknown {
    return this.getLocalStorage().get(id)
  }

  public add (item: unknown): number {
    const id = this.nextFreeKey()
    const data = this.getLocalStorage()
    data.set(id, item)
    this.saveLocalStorage(data)
    return id
  }

  public remove (id: number): boolean {
    const data = this.getLocalStorage()
    if (data.delete(id)) {
      this.saveLocalStorage(data)
      return true
    }
    return false
  }

  public set (id: number, item: unknown): boolean {
    const data = this.getLocalStorage()
    if (!data.has(id)) {
      return false
    } else {
      data.set(id, item)
      this.saveLocalStorage(data)
      return true
    }
  }
}
