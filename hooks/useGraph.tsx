'use client'

import { Chart } from 'chart.js/auto'
import { useCallback } from 'react'
import zoomPlugin from 'chartjs-plugin-zoom'
import { tickCallback } from 'services/chart/tickCallback'
import { getMaxLength, getAnnotations, getDataSet } from 'services/chart/excelToGraphHelper'
import { MyExcelDataType } from 'providers/ExcelProvider'
import annotaionPlugin from 'chartjs-plugin-annotation'
import { drawPointPlugin } from 'services/chart/plugins/drawPointPlugin'
import { backgroundPlugin } from 'services/chart/plugins/backgroundPlugin'
import { titleBackgroundPlugin } from 'services/chart/plugins/titlePlugin'

Chart.register(annotaionPlugin)

export default function useGraph() {
  const initGraph = useCallback((canvas: HTMLCanvasElement, title?: string, excelData?: MyExcelDataType) => {
    const maxLength = getMaxLength(excelData?.data)
    const annotations = getAnnotations(excelData?.data)

    return new Chart(canvas, {
      type: 'scatter',
      plugins: [zoomPlugin, annotaionPlugin, drawPointPlugin, backgroundPlugin, titleBackgroundPlugin],
      options: {
        responsive: true,
        plugins: {
          annotation: {
            annotations,
          },
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
              top: 30,
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
              x: { min: -1000, max: maxLength.x },
              y: { min: -1000, max: maxLength.y },
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
            min: -1000,
            max: maxLength.x,
            backgroundColor: 'white',
          },
          y: {
            ticks: {
              display: true,
              maxTicksLimit: 25,
              callback: tickCallback,
            },
            min: -1000,
            max: maxLength.y,
            backgroundColor: 'white',
          },
        },
      },
      data: {
        datasets: getDataSet(excelData),
      },
    })
  }, [])

  return { initGraph }
}
