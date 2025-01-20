export class FixedLengthArray<T = unknown> extends Array<T | null> {
  constructor(length: number, fill: T | null = null) {
    super(length)
    this.fill(fill)
    Object.seal(this)
  }

  isExist() {
    return this.some(Boolean)
  }

  arrayPushedItem(item: T): FixedLengthArray<T> {
    if (this[this.length - 1]) {
      console.warn("FixedLengthArray can't take elements more than given length")
    }

    const temp = this.copy()

    for (let i = 0; i < this.length; i++) {
      if (!temp[i]) {
        temp[i] = item
        break
      }
    }

    return temp
  }

  arrayPopedIndex(index?: number): FixedLengthArray<T> {
    const temp = this.copy()

    if (index || index === 0) {
      temp[index] = null
    } else {
      for (let i = this.length - 1; i >= 0; i--) {
        if (temp[i]) {
          temp[i] = null
          break
        }
      }
    }

    return temp.arraySorted()
  }

  arraySorted(compareFn?: (a: T | null, b: T | null) => number): FixedLengthArray<T> {
    const tempSorted = this.copy().sort(compareFn)
    const temp = new FixedLengthArray<T>(this.length)

    for (let i = 0; i < this.length; i++) {
      temp[i] = tempSorted[i]
    }

    return temp
  }

  copy(): FixedLengthArray<T> {
    const temp = new FixedLengthArray<T>(this.length)

    for (let i = 0; i < this.length; i++) {
      temp[i] = this[i]
    }

    return temp
  }

  map<U>(callback: (value: T | null, index: number, array: this) => U): FixedLengthArray<U> {
    const result = new FixedLengthArray<U>(this.length)
    for (let i = 0; i < this.length; i++) {
      result[i] = callback(this[i], i, this)
    }
    return result
  }
}
