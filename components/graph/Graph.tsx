'use client'

import { useContext, useLayoutEffect, useRef } from 'react'
import { Chart } from 'chart.js'
import useGraph from 'hooks/useGraph'
import { excelContext } from 'providers/ExcelProvider'

export function Graph() {
  const { selectedExcel } = useContext(excelContext)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const graphRef = useRef<Chart | null>(null)
  const { initGraph } = useGraph()

  useLayoutEffect(() => {
    if (!selectedExcel) return
    else {
      graphRef.current = initGraph(canvasRef.current!)
      return () => {
        graphRef.current?.destroy()
      }
    }
  }, [selectedExcel])

  return (
    <>
      {selectedExcel && (
        <div className="CONTENT-CONTAINER gap-4">
          {/* <h1 className="typograph-24 font-bold">{selectedFile.name}</h1> */}
          <canvas key={selectedExcel.toString()} ref={canvasRef} />
        </div>
      )}
    </>
  )
}
