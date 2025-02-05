'use client'

import dynamic from 'next/dynamic'
import { ExcelChart } from 'components/chart/ExcelChart'

const Chart = dynamic(() => Promise.resolve(ExcelChart), {
  ssr: false,
})

export function ChartContainer() {
  return (
    <>
      <Chart />
    </>
  )
}
