'use client'

import dynamic from 'next/dynamic'
import { Graph as _Graph } from 'components/graph/Graph'

const Graph = dynamic(() => Promise.resolve(_Graph), {
  ssr: false,
})

export function GraphContainer() {
  return (
    <>
      <Graph />
    </>
  )
}
