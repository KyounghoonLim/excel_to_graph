import { GraphStyle } from '@/@enum/my_excel_enum'
import { DataSheetData, DataSheetType, ResultSheetData, ResultSheetType } from '@/@types/my_excel_type'
import { ChartDataset } from 'chart.js'
import { AnnotationOptions } from 'chartjs-plugin-annotation'
import { MyExcelDataType } from 'providers/ExcelProvider'

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

    maxLength.x = Math.ceil(maxLength.x / 50) * 50 + 1000
    maxLength.y = Math.ceil(maxLength.y / 50) * 50 + 1000

    return maxLength
  }
}

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

export function getDataSet(_: MyExcelDataType) {
  const dataSet: ChartDataset[] = [
    {
      label: '기본수직',
      data: [],
      backgroundColor: '#ff8cb100',
      radius: 0,
      pointHitRadius: 0,
    },
    {
      label: '추가수직',
      data: [],
      backgroundColor: '#63a9ff00',
      radius: 0,
      pointHitRadius: 0,
    },
    {
      label: '추가수평',
      data: [],
      backgroundColor: '#03fca96600',
      radius: 0,
      pointHitRadius: 0,
    },
  ]
  const data = sliceTitle<DataSheetType, DataSheetData>(_.data)
  const resultData = sliceTitle<ResultSheetType, ResultSheetData>(_.result)
  const tick = 250

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < resultData.length; j++) {
      if (!resultData[j][i]) continue
      const str = resultData[j][i].toString()

      const step = Number(str.slice(1))
      const floor = Number(str[0]) - 1
      const height = (() => {
        let h = 0
        for (let k = 0; k < floor; k++) {
          h += data[k][2]
        }
        return h
      })()

      // 세로축으로 계산함 //
      const sum = tick * step
      const x = Math.floor(sum / data[floor][2]) * data[i][3] + getGridOffset(data, floor)
      const y = (sum % data[floor][2]) + height
      dataSet[i].data.push({ x, y })
    }
  }

  return dataSet
}

function sliceTitle<T = DataSheetType, U = unknown>(data: T): U[] {
  return data.slice(1)
}

function getGridOffset(data: DataSheetData[], index: number) {
  // 그래프 모양 //
  const graphStyle = GraphStyle[data[0][4]]
  const graphStyleNum = graphStyle === 'STYLE_1' ? 2 : 3
  // 교차비율 //
  const width = (data[index] as DataSheetData)[3]
  const offset = data[0][5] * width * (index % graphStyleNum)
  return offset
}
