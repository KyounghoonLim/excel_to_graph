'use client'

import { useCallback, useRef } from 'react'
import { ExcelReader } from 'services/excel/excelReader'

export function useExcel() {
  const { current: excelReader } = useRef<ExcelReader>(new ExcelReader())

  const getExcelData = useCallback((buffer: ArrayBuffer) => {
    const data = excelReader.readData(buffer)
    const sheets = {
      data: excelReader.sheetToJson(data.Sheets['data']),
      result: excelReader.sheetToJson(data.Sheets['result']),
    }
    return sheets
  }, [])

  return { getExcelData }
}
