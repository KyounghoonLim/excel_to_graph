import { DataSheetData, DataSheetType, ResultSheetData, ResultSheetType } from '@/@types/my_excel_type'
import { ChartDataset } from 'chart.js'
import { MyExcelDataType } from 'providers/ExcelProvider'
import { sliceTitle } from '../utils/sliceTitle'
import { getGridOffset } from '../utils/getGridOffset'

export function getDataSet(_: MyExcelDataType) {
  const dataSet: ChartDataset[] = [
    {
      label: '기본수직',
      data: [],
      backgroundColor: '#ff8cb1',
      borderColor: '#f7407b',
      radius: 0,
      pointHitRadius: 0,
    },
    {
      label: '추가수직',
      data: [],
      backgroundColor: '#63a9ff',
      borderColor: '#2185ff',
      radius: 0,
      pointHitRadius: 0,
    },
    {
      label: '추가수평',
      data: [],
      backgroundColor: '#26ff2d',
      borderColor: '#04d40b',
      radius: 0,
      pointHitRadius: 0,
    },
  ]
  const data = sliceTitle<DataSheetType, DataSheetData>(_.data)
  const resultData = sliceTitle<ResultSheetType, ResultSheetData>(_.result)

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < resultData.length; j++) {
      if (!resultData[j][i]) continue
      else {
        const obj = (resultData[j][i] as string).split('#').map((ele) => Number(ele))

        const floor = obj[0] - 1 // 데이터상 floor 는 1부터 있으므로
        const left = obj[1] - 1 // 데이터상 첫 번째는 프로그래밍적으로 0번째

        const height = (() => {
          let h = 0
          for (let k = 0; k < floor; k++) {
            h += data[k][2]
          }
          return h
        })()

        const tick = 250 // 세로축의 경우 세로로 용접부가 있고, 가로축의 경우 가로로 용접부가 있음.
        const offset = getGridOffset(data, floor)
        let x, y
        // 세로축 기준 //
        if (i < 2) {
          const top = obj[2] - 1 // 데이터상 첫 번째는 프로그래밍적으로 0번째
          x = left * data[i][3] + offset
          y = tick * top + height
        }
        // 가로축 기준 //
        else {
          x = left * tick + offset
          y = height
        }
        dataSet[i].data.push({ x, y, offset })
      }
    }
  }

  return dataSet
}
