import { GraphStyle } from '@/@enum/my_excel_enum'
import { DataSheetData } from '@/@types/my_excel_type'

export function getGridOffset(data: DataSheetData[], index: number) {
  // 그래프 모양 //
  const graphStyle = GraphStyle[data[0][4]]
  const graphStyleNum = graphStyle === 'STYLE_1' ? 2 : 3
  // 교차비율 //
  const width = (data[index] as DataSheetData)[3]
  const offset = data[0][5] * width * (index % graphStyleNum)

  return offset
}
