'use client'

import dynamic from 'next/dynamic'
import { ExcelChart } from 'components/chart/ExcelChart'
import { useLayoutEffect, useState } from 'react'

// const Chart = dynamic(async () => await import('components/chart/ExcelChart'), {
//   ssr: false,
// })
const Chart = dynamic(() => Promise.resolve(ExcelChart), {
  ssr: false,
})

export function ChartContainer() {
  return (
    <>
      <Chart />
      {/* <ExcelChart /> */}
    </>
  )
}
