import { Plugin } from 'chart.js'

export const backgroundPlugin: Plugin = {
  id: 'backgroundColorPlugin',
  beforeDraw: (chart) => {
    const { ctx } = chart
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, chart.width, chart.height)
    ctx.restore()
  },
}
