import { ChartEvent, LinearScale, Tooltip } from 'chart.js'
import { MyChart } from '../@types/MyChart'

// follow mode //
Tooltip.positioners['custom'] = function (elements, eventPosition) {
  return {
    x: eventPosition.x,
    y: eventPosition.y,
  }
}

export function clickHandler(event: ChartEvent, elements, chart: MyChart) {
  const { width, height } = chart.chartArea
  const paddingTop = chart.titleBlock?.height || 0 // title 이 들어가는 블럭의 높이
  const paddingLeft = (chart.boxes.filter((box) => box['axis'] === 'y')[0] as LinearScale)?.width || 0 // y 축 박스의 높이

  const mouseX = event.x - paddingLeft
  const mouseY = event.y - paddingTop

  const zoomBounds = (() => {
    const { x, y } = chart.getZoomedScaleBounds()
    return { x: x || { min: 0, max: chart.scales.x.max }, y: y || { min: 0, max: chart.scales.y.max } }
  })()
  const scaleX = zoomBounds.x.max - zoomBounds.x.min
  const scaleY = zoomBounds.y.max - zoomBounds.y.min

  // 마우스 픽셀 위치 -> 데이터 좌표 변환
  const dataX = (mouseX / width) * scaleX + zoomBounds.x.min
  const dataY = (1 - mouseY / height) * scaleY + zoomBounds.y.min

  let found = false

  for (const { dataX: x, dataY: y, datasetIndex, index, direction } of chart.$customScatterRects) {
    if (found) break
    switch (direction) {
      case 'vertical': {
        const rangeX = [x - 50, x + 50]
        const rangeY = [y, y + 250]

        if (dataX >= rangeX[0] && dataX <= rangeX[1] && dataY >= rangeY[0] && dataY <= rangeY[1]) {
          found = true

          chart.tooltip.setActiveElements([{ datasetIndex, index }], { x, y })
        }
        break
      }
      case 'horizontal': {
        break
      }
    }
  }

  if (!found) {
    chart.tooltip.setActiveElements([], { x: undefined, y: undefined }) // 툴팁 숨기기
  }

  chart.update()
}
