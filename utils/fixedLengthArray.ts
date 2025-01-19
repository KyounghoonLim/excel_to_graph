export class FixedLengthArray<T = unknown> extends Array<T | null> {
  constructor(length: number, fill: T | null = null) {
    super(length)
    this.fill(fill)
    Object.seal(this)
  }
}
