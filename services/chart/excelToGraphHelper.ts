import { DataSheetType } from '@/@types/my_excel_type'

export function getMaxLength(data: DataSheetType) {
  const maxLength = { x: 0, y: 0 }
  if (!data) {
    maxLength.x = 10000
    maxLength.y = 10000
  } else {
    for (let i = 2; i < data.length; i++) {
      maxLength.x += data[i][3]
      maxLength.y += data[i][2]
    }

    return maxLength
  }
}
