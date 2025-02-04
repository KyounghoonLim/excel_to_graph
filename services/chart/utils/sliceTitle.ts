import { DataSheetType } from '@/@types/my_excel_type'

export function sliceTitle<T = DataSheetType, U = unknown>(data: T): U[] {
  return (data as Array<U>).slice(1)
}
