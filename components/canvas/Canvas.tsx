'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { ThreeClient } from 'services/Three/ThreeClient'

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [threeClient] = useState<ThreeClient>(new ThreeClient())

  useLayoutEffect(() => {
    threeClient.initRenderer(canvasRef.current!)
    threeClient.startRenderLoop()

    return () => {
      threeClient.destroy()
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
