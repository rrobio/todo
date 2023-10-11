import type IStorage from './storage'

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

  private nextFree (): number {
    const keys = [...this.storage.keys()]
    if (keys.length === 0) {
      return 0
    }
    return keys[keys.length - 1] + 1
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
