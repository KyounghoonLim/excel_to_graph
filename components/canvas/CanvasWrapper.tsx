'use client'

import dynamic from 'next/dynamic'
import { Canvas as _Canvas } from 'components/canvas/Canvas'

const Canvas = dynamic(() => Promise.resolve(_Canvas), {
  ssr: false,
})

export function CanvasWrapper() {
  return (
    <section className="CONTENT-CONTAINER">
      <Canvas />
    </section>
  )
}
