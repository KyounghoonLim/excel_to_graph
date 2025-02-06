'use client'

import { Chart } from 'chart.js/auto'
import { useCallback, useState } from 'react'
import zoomPlugin from 'chartjs-plugin-zoom'
import { tickCallback } from 'services/chart/utils/tickCallback'
import { MyExcelDataType } from 'providers/ExcelProvider'
import annotaionPlugin from 'chartjs-plugin-annotation'
import { drawPointPlugin } from 'services/chart/plugins/drawPointPlugin'
import { backgroundPlugin } from 'services/chart/plugins/backgroundPlugin'
import { titleBackgroundPlugin } from 'services/chart/plugins/titlePlugin'
import { getAnnotations } from 'services/chart/functions/getAnnotations'
import { getMaxLength } from 'services/chart/functions/getMaxLength'
import { clickHandler } from 'services/chart/functions/clickHandler'
import { tooltipFooterCallback, tooltipLabelCallback } from 'services/chart/utils/tooltipCallback'
import { getDataset } from 'services/chart/functions/getDataset'
import { drawDistancePlugin } from 'services/chart/plugins/drawDistancePlugin'
import { MyChart } from 'services/chart/@types/MyChart'
import { exportChartToPDF } from 'services/pdf/canvasToPdf'

Chart.register(annotaionPlugin)
Chart.register(drawDistancePlugin)

export function useChart() {
  const [chart, setChart] = useState<MyChart>()

  const initChart = useCallback((canvas: HTMLCanvasElement, title?: string, excelData?: MyExcelDataType) => {
    const maxLength = getMaxLength(excelData?.data)
    const annotations = getAnnotations(excelData?.data)

    const chart: MyChart = new Chart(canvas, {
      type: 'scatter',
      plugins: [
        zoomPlugin,
        annotaionPlugin,
        drawPointPlugin,
        drawDistancePlugin,
        backgroundPlugin,
        titleBackgroundPlugin,
      ],
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            //@ts-ignore
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
              maxTicksLimit: 50,
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
              maxTicksLimit: 50,
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
        datasets: getDataset(excelData),
      },
    })

    chart.$excelData = excelData
    chart.$graphStyle = excelData.data[1][4]
    chart.$title = title.split('.')[0]

    console.log(chart)

    setChart(chart)
  }, [])

  const chartToPdf = useCallback(() => {
    if (!chart) return
    else {
      exportChartToPDF(chart)
    }
  }, [chart])

  return { initChart, chartToPdf, chart }
}
