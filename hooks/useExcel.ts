'use client'

import { useCallback, useState } from 'react'
import { ExcelReader } from 'services/excelReader'

export function useExcel() {
  const [excelReader] = useState<ExcelReader>(new ExcelReader())

  const getExcelSheets = useCallback(
    (buffer: ArrayBuffer) => {
      const data = excelReader.readData(buffer)
      return data.Sheets
    },
    [excelReader]
  )

  return { getExcelSheets }
}
