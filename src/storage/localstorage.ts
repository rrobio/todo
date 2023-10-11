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

  private nextFree (): number {
    const keys = [...this.getLocalStorage().keys()]
    if (keys.length === 0) {
      return 0
    }
    return keys[keys.length - 1] + 1
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
