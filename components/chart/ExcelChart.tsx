'use client'

import { useCallback, useContext, useLayoutEffect, useMemo, useRef } from 'react'
import { useChart } from 'hooks/useChart'
import { excelContext } from 'providers/ExcelProvider'
import { filesContext } from 'providers/FilesProvider'
import DownloadIcon from 'icons/download.svg'

export function ExcelChart() {
  const { fileObjects, selectedIndex } = useContext(filesContext)
  const { selectedExcel } = useContext(excelContext)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { chart, chartToPdf, initChart } = useChart()

  const selectedFile = useMemo(() => fileObjects[selectedIndex]?.file, [fileObjects, selectedIndex])

  const downloadFile = useCallback(() => {
    if (window?.confirm('파일을 pdf 로 다운로드 하시겠습니까?')) {
      chartToPdf()
    }
  }, [chartToPdf])

  useLayoutEffect(() => {
    if (!selectedExcel) return
    else {
      initChart(canvasRef.current, selectedFile?.name, selectedExcel)
      return () => {
        chart?.destroy()
      }
    }
  }, [selectedExcel])

  return (
    <>
      {selectedExcel && (
        <>
          <div className="CONTENT-CONTAINER gap-4 p-6">
            <canvas key={selectedExcel.toString()} ref={canvasRef} />
          </div>
          <button
            className="fixed bottom-4 right-4 w-12 h-12 flex-row-center bg-black rounded-[50%] scale-90 hover:scale-100 cursor-pointer duration-150"
            onClick={downloadFile}
            title="pdf 로 다운로드"
          >
            <DownloadIcon />
          </button>
        </>
      )}
    </>
  )
}
