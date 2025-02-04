import { GraphStyle } from '@/@enum/my_excel_enum'
import { DataSheetData, DataSheetType } from '@/@types/my_excel_type'
import { sliceTitle } from '../utils/sliceTitle'

export function getMaxLength(_: DataSheetType) {
  const maxLength = { x: 0, y: 0 }
  const data = sliceTitle<DataSheetType, DataSheetData>(_)

  if (!data) {
    maxLength.x = 10000
    maxLength.y = 10000
  } else {
    for (let i = 0; i < data.length; i++) {
      maxLength.x += (data[i] as DataSheetData)[3]
      maxLength.y += (data[i] as DataSheetData)[2]
    }

    // 그래프 스타일에 따른 보정 //
    const graphStyle = GraphStyle[data[0][4]]
    const graphStyleNum = graphStyle === 'STYLE_1' ? 1 : 2
    maxLength.x += data[0][3] * data[0][5] * graphStyleNum

    maxLength.x = Math.ceil(maxLength.x / 50) * 50
    maxLength.y = Math.ceil(maxLength.y / 50) * 50

    return maxLength
  }
}
