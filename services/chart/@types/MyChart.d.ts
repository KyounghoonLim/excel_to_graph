import { GraphStyleType } from '@/@enum/my_excel_enum'
import { Chart } from 'chart.js'
import { MyExcelDataType } from 'providers/ExcelProvider'
import { FixedLengthArray } from 'utils/FixedLengthArray'

export interface MyChart extends Chart {
  $excelData?: MyExcelDataType
  $customScatterRects?: Array<ScatterRect>
  $relativeDataset?: {
    verticalDataset: FixedLengthArray<FixedLengthArray<FixedLengthArray<ScatterRect | undefined>>>
    horizontalDataset: FixedLengthArray<FixedLengthArray<ScatterRect | undefined>>
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
  coordinate?: number[]
  rawData?: unknown
  direction: 'vertical' | 'horizontal'
}
