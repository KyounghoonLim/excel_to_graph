'use client'

import { Chart } from 'chart.js/auto'
import { useCallback } from 'react'
import zoomPlugin from 'chartjs-plugin-zoom'
import dummyData from '@/@dummy/dummyData.json'
import { tickCallback } from 'services/chart/tickCallback'
import { getMaxLength } from 'services/chart/excelToGraphHelper'
import { MyExcelDataType } from 'providers/ExcelProvider'

export default function useGraph() {
  const initGraph = useCallback((canvas: HTMLCanvasElement, title?: string, excelData?: MyExcelDataType) => {
    const maxLength = getMaxLength(excelData?.data)

    return new Chart(canvas, {
      type: 'scatter',
      plugins: [zoomPlugin],
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: Boolean(title),
            text: title,
            font: {
              size: 24,
            },
            color: 'black',
            padding: {
              bottom: 30,
            },
          },
          zoom: {
            zoom: {
              wheel: { enabled: true, speed: 0.05 },
              pinch: { enabled: true },
            },
            pan: {
              enabled: true,
            },
            limits: {
              x: { min: 0, max: maxLength.x },
              y: { min: 0, max: maxLength.y },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
              maxTicksLimit: 25,
              callback: tickCallback,
            },
            min: 500,
            max: maxLength.x,
          },
          y: {
            ticks: {
              display: true,
              maxTicksLimit: 25,
              callback: tickCallback,
            },
            min: 500,
            max: maxLength.y,
          },
        },
      },
      data: dummyData,
    })
  }, [])

  return { initGraph }
}
