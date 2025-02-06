import { Plugin, ScatterDataPoint } from 'chart.js'
import { MyChart, ScatterRect } from '../@types/MyChart'

export const drawPointPlugin: Plugin = {
  id: 'customDrawPointPlugin',
  beforeDraw: (chart: MyChart) => {
    const ctx = chart.ctx
    const datasets = chart.data.datasets

    if (!chart.$customScatterRects) {
      chart.$customScatterRects = [] // ✅ 차트 객체에 데이터 저장 (초기화)
    }
    chart.$customScatterRects.length = 0 // ✅ 매 프레임마다 최신 데이터 유지
    ctx.save()

    const tickSize = getPixelSizeForSquare(chart)
    const width = tickSize.width // 차트 상에서 잘 보이기 위함으로 중요하지 않음
    const height = tickSize.height // 차트에서 실제로 250 만큼의 거리. 용접부의 가로, 세로에 따라 회전해서 이 녀석으로 기록

    datasets.forEach((dataset, datasetIndex) => {
      ctx.fillStyle = dataset.backgroundColor as string
      ctx.strokeStyle = dataset.borderColor as string

      const meta = chart.getDatasetMeta(datasetIndex)
      // console.log(meta)
      meta.data.forEach(({ x, y }, index) => {
        let tickX, tickY
        switch (datasetIndex) {
          // 세 번째 데이터셋은 가로축 기준 //
          case 2: {
            tickX = width * 5
            tickY = height * 3.5
            ctx.fillRect(x - tickX / 2, y - tickY / 2, tickX, tickY)
            ctx.strokeRect(x - tickX / 2, y - tickY / 2, tickX, tickY)
            break
          }
          // 나머지는 세로축 기준 //
          default: {
            tickX = width * 4
            tickY = height * 5
            ctx.fillRect(x - tickX / 2, y - tickY, tickX, tickY)
            ctx.strokeRect(x - tickX / 2, y - tickY, tickX, tickY)
          }
        }
        const rect: ScatterRect = {
          x: {
            from: datasetIndex === 2 ? x - tickX / 2 : x - tickX / 2,
            to: datasetIndex === 2 ? x + tickX / 2 : x + tickX / 2,
          },
          y: {
            from: datasetIndex === 2 ? y - tickY / 2 : y - tickY,
            to: datasetIndex === 2 ? y + tickY / 2 : y,
          },
          dataX: (dataset.data[index] as ScatterDataPoint).x,
          dataY: (dataset.data[index] as ScatterDataPoint).y,
          width: tickX,
          height: tickY,
          datasetIndex,
          index,
          coordinate: dataset.data[index].coordinate,
          rawData: dataset.data[index],
          direction: datasetIndex === 2 ? 'horizontal' : 'vertical',
          align: dataset.data[index].align,
          tickSize,
        }

        chart.$customScatterRects.push(rect)
      })

      ctx.restore()
    })
  },
}

function getPixelSizeForSquare(chart, size = 50) {
  const xScale = chart.scales['x']
  const yScale = chart.scales['y']
  if (!xScale || !yScale) return null

  // 데이터 값 기준 size 만큼 이동한 후 픽셀 거리 계산
  const xStart = xScale.getPixelForValue(0)
  const xEnd = xScale.getPixelForValue(size)
  const yStart = yScale.getPixelForValue(0)
  const yEnd = yScale.getPixelForValue(size)

  console.log(window.devicePixelRatio)
  return {
    width: Math.abs(xEnd - xStart),
    height: Math.abs(yEnd - yStart),
  }
}
