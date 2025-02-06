import { DataSheetData } from '@/@types/my_excel_type'

export function getGridOffset(data: DataSheetData[], index: number) {
  // 그래프 모양 //
  const graphStyle = data[0][4] + 1
  // 교차비율 //
  const width = (data[index] as DataSheetData)[3]
  const offset = data[0][5] * width * (index % graphStyle)

  return offset
}
