'use client'

import { Chart } from 'chart.js/auto'
import { useCallback } from 'react'
import zoomPlugin from 'chartjs-plugin-zoom'
import dummyData from '@/@dummy/dummyData.json'

export default function useGraph() {
  const initGraph = useCallback((canvas: HTMLCanvasElement) => {
    return new Chart(canvas, {
      type: 'scatter',
      plugins: [zoomPlugin],
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
        },
      },
      data: dummyData,
    })
  }, [])

  return { initGraph }
}
