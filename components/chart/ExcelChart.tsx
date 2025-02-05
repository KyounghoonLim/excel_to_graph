'use client'

import { useContext, useLayoutEffect, useMemo, useRef } from 'react'
import { Chart } from 'chart.js'
import { useChart } from 'hooks/useChart'
import { excelContext } from 'providers/ExcelProvider'
import { filesContext } from 'providers/FilesProvider'

export function ExcelChart() {
  const { fileObjects, selectedIndex } = useContext(filesContext)
  const { selectedExcel } = useContext(excelContext)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const graphRef = useRef<Chart | null>(null)
  const { initChart } = useChart()

  const selectedFile = useMemo(() => fileObjects[selectedIndex]?.file, [fileObjects, selectedIndex])

  useLayoutEffect(() => {
    if (!selectedExcel) return
    else {
      graphRef.current = initChart(canvasRef.current!, selectedFile?.name, selectedExcel)
      return () => {
        graphRef.current?.destroy()
      }
    }
  }, [selectedExcel])

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
