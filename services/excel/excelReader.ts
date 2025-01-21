import { read, utils, WorkSheet } from 'xlsx'

export class ExcelReader {
  constructor() {}

  readData(data: ArrayBuffer) {
    return read(data)
  }

  sheetToJson(sheet: WorkSheet): Array<unknown> {
    return utils.sheet_to_json(sheet, { header: 1 })
  }
}
