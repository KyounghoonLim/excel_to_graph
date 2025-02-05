'use client'

import { Chart, layouts } from 'chart.js/auto'
import { useCallback } from 'react'
import zoomPlugin from 'chartjs-plugin-zoom'
import { tickCallback } from 'services/chart/utils/tickCallback'
import { getDataSet } from 'services/chart/functions/getDataSet'
import { MyExcelDataType } from 'providers/ExcelProvider'
import annotaionPlugin from 'chartjs-plugin-annotation'
import { drawPointPlugin } from 'services/chart/plugins/drawPointPlugin'
import { backgroundPlugin } from 'services/chart/plugins/backgroundPlugin'
import { titleBackgroundPlugin } from 'services/chart/plugins/titlePlugin'
import { getAnnotations } from 'services/chart/functions/getAnnotations'
import { getMaxLength } from 'services/chart/functions/getMaxLength'
import { clickHandler } from 'services/chart/functions/clickHandler'
import { tooltipFooterCallback, tooltipLabelCallback } from 'services/chart/utils/tooltipCallback'

Chart.register(annotaionPlugin)

export function useChart() {
  const initChart = useCallback((canvas: HTMLCanvasElement, title?: string, excelData?: MyExcelDataType) => {
    const maxLength = getMaxLength(excelData?.data)
    const annotations = getAnnotations(excelData?.data)

    return new Chart(canvas, {
      type: 'scatter',
      plugins: [zoomPlugin, annotaionPlugin, drawPointPlugin, backgroundPlugin, titleBackgroundPlugin],
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            position: 'custom',
            callbacks: {
              label: tooltipLabelCallback,
              footer: tooltipFooterCallback,
            },
          },
          annotation: {
            annotations,
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
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
              x: { min: -1000, max: maxLength.x + 1000 },
              y: { min: -1000, max: maxLength.y + 1000 },
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
            grid: {
              color: '#cccccc33',
            },
            min: -1000,
            max: maxLength.x + 1000,
            backgroundColor: 'white',
          },
          y: {
            ticks: {
              display: true,
              maxTicksLimit: 25,
              callback: tickCallback,
            },
            grid: {
              color: '#cccccc33',
            },
            min: -1000,
            max: maxLength.y + 1000,
            backgroundColor: 'white',
          },
        },
        onClick: clickHandler,
      },
      data: {
        datasets: getDataSet(excelData),
      },
    })
  }, [])

  return { initChart }
}
