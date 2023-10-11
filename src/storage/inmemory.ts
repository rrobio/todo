import { type IStorage, type ID, nextID } from '../repository/repository'

export default class InMemoryStorage implements IStorage {
  private readonly storage = new Map<number, unknown>()

  getAll (): unknown[] {
    return [...this.storage.values()]
  }

  get (id: number): unknown | null {
    if (this.storage.has(id)) {
      return this.storage.get(id)
    }
    return null
  }

  public add (item: unknown, id?: number): number {
    if (id !== undefined) {
      this.storage.set(id, item)
      return id
    } else {
      const nextFree = this.nextFree()
      return this.add(item, nextFree)
    }
  }

  private nextFree (): ID {
    const keys = [...this.storage.keys()]
    if (keys.length === 0) {
      return nextID()
    }
    const newKey = nextID(keys[keys.length - 1])
    return newKey
  }

  public remove (id: number): boolean {
    return this.storage.delete(id)
  }

  public set (id: number, item: unknown): boolean {
    if (!this.storage.has(id)) {
    return false
  }

  public set (id: number, item: unknown): boolean {
    this.storage.set(id, item)
    return true
  }

  public setBy (item: unknown, compareFn: (other: unknown) => boolean): boolean {
    for (const [index, value] of this.storage.entries()) {
      if (compareFn(value)) {
        this.storage.set(index, item)
        return true
      }
    }
    // not in storage
    this.add(item)
    return true
  }
}
