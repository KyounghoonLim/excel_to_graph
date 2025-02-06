import { Plugin } from 'chart.js'
import { MyChart, ScatterRect } from '../@types/MyChart'
import { getRelativeDataset } from '../functions/getRelativeDataset'
import { drawArrow } from '../utils/drawArrow'
import { sliceTitle } from '../utils/sliceTitle'
import { DataSheetData, DataSheetType } from '@/@types/my_excel_type'

export const drawDistancePlugin: Plugin = {
  id: 'drawDistancePlugin',
  afterDraw: (chart: MyChart) => {
    const { ctx } = chart

    chart.$relativeDataset = getRelativeDataset(chart)

    if (!chart.$relativeDataset) return
    else {
      const zoomLevel = chart.getZoomLevel()
      const data = sliceTitle<DataSheetType, DataSheetData>(chart.$excelData.data)

      for (const direction of Object.keys(chart.$relativeDataset)) {
        const dataset = chart.$relativeDataset[direction]
        // 각 층 별 //
        for (let i = 0; i < dataset.length; i++) {
          // 해당 층의 셀 별 //
          for (let j = 0; j < dataset[i].length; j++) {
            if (dataset[i][j].every(Boolean) || !dataset[i][j].some(Boolean)) {
              continue // 해당 셀의 모든 영역에 용접부가 존재하면 거리를 나타내지 않음
            }

            // 해당 shell 의 절반을 기준으로 거리 표시 (위, 아래 어디에 거리선을 그릴건지를 위해) //
            for (let k = 0; k < 2; k++) {
              const items: ScatterRect[] = []

              const isDesc = Boolean(k)

              const halfLength = Math.ceil(dataset[i][j].length / 2)
              const start = [1, dataset[i][j].length - 2] // shell 과 인접한 부분은 표시하지 않음
              const end = [halfLength, halfLength - 1]
              const step = [1, -1]

              let flag // 인접한 다른 용접부가 존재하는지 여부

              for (let l = start[k]; l !== end[k]; l += step[k]) {
                const item = dataset[i][j][l]
                // 배열 순회중 아이템이 없다면 여기에서 거리선을 표시할 지 판단함 //
                if (!item || l === end[k] - step[k]) {
                  let index = l
                  if (l === end[k] - step[k] && item) {
                    flag = true
                    items.push({ ...item })
                    index = l + step[k] // 경계지점에 있는 경우 거리 보정
                  }
                  const currItem = items[items.length - 1]

                  // 현재까지 기록된 아이템이 있다면 여기까지 표시함 //
                  if (flag && currItem) {
                    switch (direction) {
                      case 'verticalDataset': {
                        const distance = getVerticalDistance(isDesc, halfLength * 2 - 1, index)
                        const { from, to } = getY(isDesc, distance, currItem)

                        items[items.length - 1].y.from = from
                        items[items.length - 1].y.to = to
                        items[items.length - 1].distance = distance
                        break
                      }
                      case 'horizontalDataset': {
                        const { from, to } = getX(currItem)

                        items[items.length - 1].x.from = from
                        items[items.length - 1].x.to = to
                        items[items.length - 1].distance = currItem.align.leanIndex
                        break
                      }
                    }
                  }
                  flag = null // 연속된 아이템이 없다는 뜻
                }
                // 배열 순회중 아이템이 있다면 어디서부터 어디까지 표시할 지 기록함 //
                else {
                  if (flag) items.pop() // 인접한 용접부가 있다면 제일 마지막에 나온 용접부만 표시함 //
                  else flag = true // 인접한 용접부가 없다면 지금부터 인접한지 기록함 //
                  items.push({ ...item })
                }
              }

              items.forEach((item, idx) => {
                const { x, y } = item

                const labelText = getLabelText(item)
                ctx.font = `${Math.max(1, zoomLevel / 2) * 8}px serif`
                ctx.lineWidth = Math.min(4, Math.max(1, zoomLevel))
                const labelWidth = ctx.measureText(labelText).width

                // 첫 번째 셀이거나 절반 기준 상단인 경우는 오른쪽에 표시
                // 마지막 셀이거나 절반 기준 하단인 경우 왼쪽에 표시
                switch (direction) {
                  case 'verticalDataset': {
                    let arrowX
                    const isLeftside = getIsLeftside(Boolean(k), item, data)
                    switch (isLeftside) {
                      case true: {
                        arrowX = x.to - (idx + 1) * zoomLevel * 15
                        break
                      }
                      case false: {
                        arrowX = x.to + (idx + 1) * zoomLevel * 15
                        break
                      }
                    }

                    drawArrow(ctx, arrowX, y.from, arrowX, y.to, {
                      labelX: arrowX + (isLeftside ? -labelWidth - 5 : 5),
                      labelY: y.to,
                      text: labelText,
                    })
                    break
                  }
                  case 'horizontalDataset': {
                    let arrowY

                    switch (item.align.side) {
                      case 'upside': {
                        arrowY = y.to - (idx + 1) * zoomLevel * 15
                        break
                      }
                      case 'downside': {
                        arrowY = y.to + (idx + 1) * zoomLevel * 15
                        break
                      }
                    }

                    drawArrow(ctx, x.from, arrowY, x.to, arrowY, {
                      labelX: x.to + (item.align.align === 'left' ? -labelWidth / 1.5 : 0),
                      // labelX: x.to,
                      labelY:
                        arrowY + (item.align.side === 'upside' ? -5 : 10) * Math.min(4, Math.max(1, zoomLevel / 2)),
                      text: labelText,
                    })
                    break
                  }
                }
              })
            }
          }
        }
      }

      ctx.restore()
    }
  },
}

function getVerticalDistance(isDesc: boolean, length: number, target: number) {
  switch (isDesc) {
    // 상단 기준 //
    case true: {
      return length - target
    }
    // 하단 기준 //
    case false: {
      return target - 0
    }
  }
}

// shell 에서 부터의 높이를 구하고, 화살표의 방향도 결정함 //
function getY(isDesc: boolean, distance: number, item: ScatterRect) {
  const y = { from: 0, to: 0 }
  // 내림차순
  if (isDesc) {
    y.from = item.y.to - item.height * distance
    y.to = item.y.from + item.height
  }
  // 오름차순
  else {
    y.from = item.y.from + item.height * distance
    y.to = item.y.to - item.height
  }

  return y
}

// 근처 shell 에서 부터의 가장 가까운 가로를 구하고, 화살표의 방향도 결정함 //
function getX(item: ScatterRect) {
  const x = { from: 0, to: 0 }

  switch (item.align.align) {
    case 'left': {
      x.from = item.x.from - item.align.leanIndex * item.width + item.width / 2
      x.to = item.x.to
      break
    }
    case 'right': {
      x.from = item.x.to + item.align.leanIndex * item.width - item.width / 2
      x.to = item.x.from
      break
    }
  }

  return x
}

function getIsLeftside(isDesc: boolean, item: ScatterRect, dataset: DataSheetData[]) {
  const floor = item.coordinate[0] - 1
  const shell = item.coordinate[1] - 1

  const shellNum = dataset[0][1]
  const graphStyle = dataset[0][4]

  if (floor % (graphStyle + 1) === 0) {
    if (shell === 0) return false
    else if (shell === shellNum - 1) return true
    else return !isDesc
  } else {
    return !isDesc
  }
}

function getLabelText(item: ScatterRect) {
  return `${Math.round(item.distance) * 250}mm`
}
