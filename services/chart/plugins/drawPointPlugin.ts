import { Plugin } from 'chart.js'

export const drawPointPlugin: Plugin = {
  id: 'customDrawPointPlugin',
  beforeDraw: (chart) => {
    const ctx = chart.ctx
    const datasets = chart.data.datasets

    ctx.save()

    const zoomLevel = chart.getZoomLevel()
    const baseSize = (chart.canvas.width * (2.34 / 1344)) / chart.options.devicePixelRatio

    datasets.forEach((dataset, index) => {
      const width = baseSize * zoomLevel * 1.5
      const height = baseSize * zoomLevel * 2.5

      ctx.fillStyle = (dataset.backgroundColor as string).slice(0, -2)

      const meta = chart.getDatasetMeta(index)
      meta.data.forEach(({ x, y }) => {
        ctx.fillRect(x - width / 2, y - height, width, height)
      })
      ctx.restore()
    })
  },
}
