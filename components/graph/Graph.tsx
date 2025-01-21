'use client'

import { useContext, useLayoutEffect, useMemo, useRef } from 'react'
import { Chart } from 'chart.js'
import useGraph from 'hooks/useGraph'
import { excelContext } from 'providers/ExcelProvider'
import { filesContext } from 'providers/FilesProvider'

export function Graph() {
  const { fileObjects, selectedIndex } = useContext(filesContext)
  const { selectedExcel } = useContext(excelContext)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const graphRef = useRef<Chart | null>(null)
  const { initGraph } = useGraph()

  const selectedFile = useMemo(() => fileObjects[selectedIndex]?.file, [fileObjects, selectedIndex])

  useLayoutEffect(() => {
    if (!selectedExcel) return
    else {
      graphRef.current = initGraph(canvasRef.current!, selectedFile?.name, selectedExcel)
      console.log(graphRef.current)
      return () => {
        graphRef.current?.destroy()
      }
    }
  }, [selectedExcel])

  console.log(selectedExcel)
  console.log(selectedExcel?.data)

  return (
    <>
      {selectedExcel && (
        <div className="CONTENT-CONTAINER gap-4 p-6">
          <canvas key={selectedExcel.toString()} ref={canvasRef} />
        </div>
      )}
    </>
  )
}
