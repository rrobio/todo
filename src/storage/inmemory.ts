import type IStorage from './storage'

export default class InMemoryStorage implements IStorage {
  private readonly storage = new Map<number, unknown>()

  private nextFreeID (): number {
    const keys = [...this.storage.keys()]
    if (keys.length === 0) {
      return 0
    }
    return keys[keys.length - 1] + 1
  }

  public getAll (): Array<[number, unknown]> {
    const ret = Array<[number, unknown]>()
    this.storage.forEach((value, key) => ret.push([key, value]))
    return ret
  }

  public get (id: number): unknown | null {
    if (this.storage.has(id)) {
      return this.storage.get(id)
    }
    return null
  }

  public add (item: unknown): number {
    const id = this.nextFreeID()
    this.storage.set(id, item)
    return id
  }

  public remove (id: number): boolean {
    return this.storage.delete(id)
  }

  public set (id: number, item: unknown): boolean {
    if (!this.storage.has(id)) {
      return false
    }

    this.storage.set(id, item)
    return true
  }
}
