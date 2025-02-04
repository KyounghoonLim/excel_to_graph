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
    const baseSize = (chart.canvas.width * (2.34 / 1344)) / chart.options.devicePixelRatio
    const width = baseSize * zoomLevel * 1.5
    const height = baseSize * zoomLevel * 2.5

    datasets.forEach((dataset, datasetIndex) => {
      ctx.fillStyle = (dataset.backgroundColor as string).slice(0, -2)

      const meta = chart.getDatasetMeta(datasetIndex)

      meta.data.forEach(({ x, y }, index) => {
        ctx.fillRect(x - width / 2, y - height, width, height)
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
