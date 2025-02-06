import { GraphStyleType } from '@/@enum/my_excel_enum'
import { Chart } from 'chart.js'
import { MyExcelDataType } from 'providers/ExcelProvider'
import { FixedLengthArray } from 'utils/FixedLengthArray'

export interface MyChart extends Chart {
  $excelData?: MyExcelDataType
  $customScatterRects?: Array<ScatterRect>
  $relativeDataset?: {
    verticalDataset: FixedLengthArray<FixedLengthArray<FixedLengthArray<ScatterRect>>>
    horizontalDataset: FixedLengthArray<FixedLengthArray<FixedLengthArray<ScatterRect>>>
  }
  $graphStyle: GraphStyleType
}

export type ScatterRect = {
  x: {
    from: number
    to: number
  }
  y: {
    from: number
    to: number
  }
  dataX: number
  dataY: number
  width: number
  height: number
  datasetIndex: number
  index: number
  direction: 'vertical' | 'horizontal'
  coordinate?: number[]
  rawData?: unknown
  distance?: number
  align?: {
    align: 'left' | 'right'
    side: 'upside' | 'downside'
    leanIndex?: number
  }
  tickSize?: {
    width: number
    height: number
  }
}
