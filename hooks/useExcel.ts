'use client'

import { useCallback, useRef } from 'react'
import { ExcelReader } from 'services/excelReader'

export function useExcel() {
  const { current: excelReader } = useRef<ExcelReader>(new ExcelReader())

  const getExcelSheets = useCallback((buffer: ArrayBuffer) => {
    const data = excelReader.readData(buffer)
    return data.Sheets
  }, [])

  return { getExcelSheets }
}
