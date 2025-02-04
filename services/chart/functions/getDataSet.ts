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
