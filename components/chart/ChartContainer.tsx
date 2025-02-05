'use client'

import dynamic from 'next/dynamic'
import { MyChart } from 'components/chart/MyChart'

const Chart = dynamic(() => Promise.resolve(MyChart), {
  ssr: false,
})

export function ChartContainer() {
  return (
    <>
      <Chart />
    </>
  )
}
