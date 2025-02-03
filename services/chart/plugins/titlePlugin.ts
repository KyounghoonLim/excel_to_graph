import { Plugin } from 'chart.js'

export const titleBackgroundPlugin: Plugin = {
  id: 'titleBackgroundPlugin',
  beforeDraw: (chart) => {
    const { ctx } = chart
    ctx.save()

    const { width } = chart.canvas
    const {
      font: { size },
      padding: { top, bottom },
    } = chart.options.plugins.title

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, top + bottom + size)

    ctx.restore()
  },
}
