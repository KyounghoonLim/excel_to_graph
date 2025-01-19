'use client'

import { useCallback, useState } from 'react'
import { ExcelReader } from 'services/excelReader'

export function useExcel() {
  const [excelReader] = useState<ExcelReader>(new ExcelReader())

  const readExcelData = useCallback((buffer: ArrayBuffer) => {
    console.log(excelReader.readData(buffer))
  }, [])

  return { readExcelData }
}
