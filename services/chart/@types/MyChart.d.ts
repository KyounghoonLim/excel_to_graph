import { Chart } from 'chart.js'

export interface MyChart extends Chart {
  $customScatterRects: Array<ScatterRect>
}

export type ScatterRect = {
  x: number
  y: number
  dataX: number
  dataY: number
  width: number
  height: number
  datasetIndex: number
  index: number
  direction: 'vertical' | 'horizontal'
}
