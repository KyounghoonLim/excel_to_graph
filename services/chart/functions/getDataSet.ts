import { DataSheetData, DataSheetType, ResultSheetData, ResultSheetType } from '@/@types/my_excel_type'
import { ChartDataset } from 'chart.js'
import { MyExcelDataType } from 'providers/ExcelProvider'
import { sliceTitle } from '../utils/sliceTitle'
import { getGridOffset } from '../utils/getGridOffset'

export function getDataset(_: MyExcelDataType) {
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
        let coordinate = (resultData[j][i] as string).split('#').map(Number)

        const floor = coordinate[0] - 1 // 데이터상 floor 는 1부터 있으므로
        const left = coordinate[1] - 1 // 데이터상 첫 번째는 프로그래밍적으로 0번째

        const width = data[0][3]
        const height = (() => {
          let h = 0
          for (let k = 0; k < floor; k++) {
            h += data[k][2]
          }
          return h
        })()

        const tick = 250 // 세로축의 경우 세로로 용접부가 있고, 가로축의 경우 가로로 용접부가 있음.
        const offset = getGridOffset(data, floor)
        // console.log(offset, floor)
        let align // 가로축의 경우 어느 세로선과 인접한지 판단하기 위함 (세로축은 기록하지 않음)
        let x, y
        // 세로축 기준 //
        if (i < 2) {
          const top = coordinate[2] - 1 // 데이터상 첫 번째는 프로그래밍적으로 0번째
          x = left * data[i][3] + offset
          y = tick * top + height
        }
        // 가로축 기준 //
        else {
          const shell = Math.floor(coordinate[1] / (width / tick)) + 1
          const step = coordinate[1] % (width / tick)

          coordinate = [coordinate[0], shell, step]

          x = left * tick + offset * (floor % data[0][4])
          y = height + data[floor][2]
          align = getAlign(coordinate, data)
        }
        dataSet[i].data.push({ x, y, offset, coordinate, align, rawCoordinate: resultData[j][i] })
      }
    }
  }
  return dataSet
}

function getAlign(coordinate: Array<number>, dataset: DataSheetData[]) {
  const tick = 250

  const width = dataset[0][3]
  const offsetRatio = dataset[0][5]

  const floor = coordinate[0] - 1
  const shell = coordinate[1] - 1
  const index = coordinate[2] - 1

  const tickNum = width / tick

  let left, right
  const alignObject = {
    align: undefined,
    side: undefined,
    leanIndex: undefined,
  }

  const flag = floor === dataset.length - 1 ? 0 : 1 // 마지막 층은 비교대상이 없으므로 보정
  const isRight = coordinate[2] > tickNum * offsetRatio

  switch (isRight) {
    // 계단 기준으로 오른쪽 //
    case true: {
      left = tickNum * offsetRatio * flag
      right = tickNum
      break
    }
    // 계단 기준으로 왼쪽 //
    case false: {
      left = 0
      right = tickNum * offsetRatio * flag
      break
    }
  }

  floor === 4 && console.log(coordinate, index, left, right, isRight, flag)

  if (index - left > right - index) {
    alignObject.align = 'right'
    alignObject.side = !isRight && flag ? 'upside' : 'downside'
    alignObject.leanIndex = right - index
  } else {
    alignObject.align = 'left'
    alignObject.side = isRight && flag ? 'upside' : 'downside'
    alignObject.leanIndex = index - left
  }

  return alignObject
}
