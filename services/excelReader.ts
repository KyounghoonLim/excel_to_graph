import { read } from 'xlsx'

export class ExcelReader {
  constructor() {}

  readData(data: ArrayBuffer) {
    return read(data)
  }
}
