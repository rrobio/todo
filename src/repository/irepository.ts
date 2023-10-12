export default abstract class Repository<T> {
  abstract getAll (): T[]
  abstract get (id?: number): T | null
  abstract add (item: T): number
  abstract remove (item: T): boolean
  abstract set (item: T): boolean
}
