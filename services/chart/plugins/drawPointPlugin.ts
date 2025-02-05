import { Plugin, ScatterDataPoint } from 'chart.js'
import { MyChart } from '../@types/MyChart'

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

    const zoomLevel = chart.getZoomLevel()
    const baseSize = (chart.canvas.width * (2.5 / 1344)) / chart.options.devicePixelRatio
    const width = baseSize * zoomLevel * 2
    const height = baseSize * zoomLevel * 2.5

    datasets.forEach((dataset, datasetIndex) => {
      ctx.fillStyle = dataset.backgroundColor as string
      ctx.strokeStyle = dataset.borderColor as string

      const meta = chart.getDatasetMeta(datasetIndex)

      meta.data.forEach(({ x, y }, index) => {
        switch (datasetIndex) {
          // 세 번째 데이터셋은 가로축 기준 //
          case 2: {
            ctx.fillRect(x, y - width / 2, height, width)
            ctx.strokeRect(x, y - width / 2, height, width)
            break
          }
          // 나머지는 세로축 기준 //
          default: {
            ctx.fillRect(x - width / 2, y - height, width, height)
            ctx.strokeRect(x - width / 2, y - height, width, height)
          }
        }

        chart.$customScatterRects.push({
          x: x - width / 2,
          y: y - height,
          dataX: (dataset.data[index] as ScatterDataPoint).x,
          dataY: (dataset.data[index] as ScatterDataPoint).y,
          width,
          height,
          datasetIndex,
          index,
          direction: datasetIndex === 2 ? 'horizontal' : 'vertical',
        })
      })
      ctx.restore()
    })
  },
}
