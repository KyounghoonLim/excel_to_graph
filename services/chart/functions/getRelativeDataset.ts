import { DataSheetData, DataSheetType, ResultSheetData, ResultSheetType } from '@/@types/my_excel_type'
import { sliceTitle } from '../utils/sliceTitle'
import { FixedLengthArray } from 'utils/FixedLengthArray'
import { MyChart } from '../@types/MyChart'

/**
 * 용접부의 거리를 측정하고 랜더링할 때, 인접한 용접부를 쉽게 판단하기 위함
 *
 * * 모든 층의 shell 의 갯수는 같음
 * * 모든 층의 가로길이는 같음
 * * 각 층마다 세로길이는 다를 수 있음. 단, 해당 층의 모든 shell 은 세로가 같음.
 * * 용접부는 100 x 250 으로 고정. 세로축, 가로축마다 회전할 수는 있음.
 */
export function getRelativeDataset(chart: MyChart) {
  const excelData = chart.$excelData
  const rects = chart.$customScatterRects

  if (!excelData || !rects) return
  else {
    const data = sliceTitle<DataSheetType, DataSheetData>(excelData.data)
    const resultData = sliceTitle<ResultSheetType, ResultSheetData>(excelData.result)

    const tick = 250 // 용접부의 길이
    const shellNum = data[0][1] // 차트마다 고정값임 (다르면 도면이 그려질 수 없음)
    const width = data[0][3] // shell 의 가로 길이 (모든 shell 의 가로 길이는 같음)

    ///////// dataset 초기화 부 //////////

    const verticalDataset: FixedLengthArray<FixedLengthArray<FixedLengthArray>> = new FixedLengthArray(data.length) // 각 층별 > 해당 층의 vertical tick 별로 채움
    const horizontalDataset: FixedLengthArray<FixedLengthArray<FixedLengthArray>> = new FixedLengthArray(data.length) // 각 층별 > 해당 층의 horizontal tick 으로 채움

    for (const i in data) {
      // 해당 층에서 가로, 세로축의 갯수는 shell 갯수 만큼 존재할 수 있으므로 (원통 구조) 3차원 배열로 만듬
      verticalDataset[i] = new FixedLengthArray(shellNum)
      horizontalDataset[i] = new FixedLengthArray(shellNum)

      for (let j = 0; j < shellNum; j++) {
        verticalDataset[i][j] = new FixedLengthArray(data[i][2] / tick) // 해당 층의 높이를 tick 으로 나눈 만큼 배열의 길이를 둠 (층마다 높이는 다를 수 있음)
        horizontalDataset[i][j] = new FixedLengthArray(width / tick) // 해당 shell 의 가로 길이를 tick 으로 나눈 만큼 배열의 길이를 둠
      }
    }
    ///////// dataset 채워넣기 ///////////

    for (let i = 0; i < resultData.length; i++) {
      for (let j = 0; j < resultData[i].length; j++) {
        try {
          const item = resultData[i][j].split('#').map(Number)

          switch (item.length) {
            // 가로축일 경우 //
            case 2: {
              const [floor, _left] = item
              const shell = Math.floor((_left * tick) / width)
              const left = (_left - 1) % (width / tick)

              horizontalDataset[floor - 1][shell][left] = rects.find((r) => {
                if (r.datasetIndex === j && r.index === i) return r
              })
              break
            }
            // 이외의 경우 //
            default: {
              const [floor, left, top] = item
              verticalDataset[floor - 1][left - 1][top - 1] = rects.find((r) => {
                if (r.datasetIndex === j && r.index === i) return r
              })
              break
            }
          }
        } catch {
          // pass
        }
      }
    }

    return {
      verticalDataset,
      horizontalDataset,
    }
  }
}
