import { Plugin } from 'chart.js'
import { MyChart, ScatterRect } from '../@types/MyChart'
import { getRelativeDataset } from '../functions/getRelativeDataset'
import { drawArrow } from '../utils/drawArrow'
import { GraphStyle } from '@/@enum/my_excel_enum'

export const drawDistancePlugin: Plugin = {
  id: 'drawDistancePlugin',
  beforeDraw: (chart: MyChart) => {
    const { ctx } = chart

    chart.$relativeDataset = getRelativeDataset(chart)

    if (!chart.$relativeDataset) return
    else {
      const { verticalDataset, horizontalDataset } = chart.$relativeDataset
      const zoomLevel = chart.getZoomLevel()

      ///////// 세로축 /////////
      // 각 층 별 //
      for (let i = 0; i < verticalDataset.length; i++) {
        // 해당 층의 셀 별 //
        for (let j = 0; j < verticalDataset[i].length; j++) {
          if (verticalDataset[i][j].every(Boolean) || !verticalDataset[i][j].some(Boolean)) {
            continue // 해당 셀의 모든 영역에 용접부가 존재하면 거리를 나타내지 않음
          }

          // 해당 shell 의 절반을 기준으로 거리 표시 (위, 아래 어디에 거리선을 그릴건지를 위해) //
          for (let k = 0; k < 2; k++) {
            const items: ScatterRect[] = []

            const halfLength = Math.ceil(verticalDataset[i][j].length / 2)
            const start = [1, verticalDataset[i][j].length - 2] // shell 과 인접한 부분은 표시하지 않음
            const end = [halfLength, halfLength - 1]
            const step = [1, -1]

            let flag // 인접한 다른 용접부가 존재하는지 여부

            for (let l = start[k]; l !== end[k]; l += step[k]) {
              const item = verticalDataset[i][j][l]

              // 배열 순회중 아이템이 없다면 여기에서 거리선을 표시할 지 판단함 //
              if (!item || l === end[k] - step[k]) {
                let index = l
                if (l === end[k] - step[k] && item) {
                  flag = true
                  items.push({ ...item })
                  index = l + step[k] / 2 // 경계지점에 있는 경우 거리 보정
                }
                const currItem = items[items.length - 1]

                // 현재까지 기록된 아이템이 있다면 여기까지 표시함 //
                if (flag && currItem) {
                  const distance = (() => {
                    switch (k) {
                      // 하단 기준 //
                      case 0: {
                        return index - 0
                      }
                      // 상단 기준 //
                      case 1: {
                        return halfLength * 2 - index - 1
                      }
                    }
                  })()
                  const { from, to } = getY(k, distance, currItem)

                  items[items.length - 1].y.from = from
                  items[items.length - 1].y.to = to
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
              const isLeftside = getIsLeftside(k, item.coordinate[0] - 1, chart.$graphStyle)
              // 첫 번째 셀이거나 절반 기준 상단인 경우는 오른쪽에 표시
              // 마지막 셀이거나 절반 기준 하단인 경우 왼쪽에 표시
              let arrowX
              switch (isLeftside) {
                case true: {
                  arrowX = x.to - (idx + 1) * zoomLevel * 15
                  break
                }
                case false: {
                  arrowX = x.to + (idx + 1) * zoomLevel * 15
                }
              }
              const labelText = `${Math.ceil(item.coordinate[2] * 250)}mm`
              const labelWidth = ctx.measureText(labelText).width
              drawArrow(ctx, arrowX, y.from, arrowX, y.to, {
                labelX: arrowX + (isLeftside ? -labelWidth - 5 : 5),
                labelY: y.to,
                text: labelText,
              })
            })
          }
        }
      }

      ctx.restore()
    }
  },
}

// shell 에서 부터의 높이를 구하고, 화살표의 방향도 결정함 //
function getY(k: number, length: number, item: ScatterRect) {
  const y = { from: 0, to: 0 }
  // 내림차순
  if (k) {
    y.from = item.y.to - item.height / 2 - item.height * length
    y.to = item.y.from + item.height
  }
  // 오름차순
  else {
    y.from = item.y.from + item.height * length
    y.to = item.y.to - (item.height * 3) / 2
  }

  return y
}

function getIsLeftside(k, floor, graphStyle) {
  if (k) return false
  else {
    switch (graphStyle) {
      case GraphStyle.STYLE_1: {
        if (floor % 2) return true
      }
      case GraphStyle.STYLE_2: {
        if (floor % 3) return true
      }
      default:
        return false
    }
  }
}
