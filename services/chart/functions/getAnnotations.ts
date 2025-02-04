import { DataSheetData, DataSheetType } from '@/@types/my_excel_type'
import { AnnotationOptions } from 'chartjs-plugin-annotation'
import { sliceTitle } from '../utils/sliceTitle'
import { getGridOffset } from '../utils/getGridOffset'

export function getAnnotations(_: DataSheetType) {
  const annotations: AnnotationOptions[] = []
  const data = sliceTitle<DataSheetType, DataSheetData>(_)

  if (!data) return
  else {
    let y = 0
    // 행 반복 (해당 단에 대해서) //
    for (let i = 0; i < data.length; i++) {
      const width = data[i][3]
      const height = data[i][2]
      const offset = getGridOffset(data, i)
      // 해당 단에 위치하는 shell 갯수에 대한 좌표 도출 //
      for (let j = 0; j < (data[i] as DataSheetData)[1]; j++) {
        const annotation: AnnotationOptions = {
          type: 'box',
          xMin: offset + width * j,
          xMax: offset + width * (j + 1),
          yMin: y,
          yMax: y + height,
          drawTime: 'beforeDraw',
          borderWidth: 4,
          borderColor: '#aaaaaa',
          borderJoinStyle: 'round',
          backgroundColor: 'transparent',
        }
        annotations.push(annotation)
      }
      y += data[i][2]
    }
    return annotations
  }
}
