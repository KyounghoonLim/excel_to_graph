'use client'

import { useExcel } from 'hooks/useExcel'
import { createContext, PropsWithChildren, useContext, useLayoutEffect, useState } from 'react'
import { Sheet } from 'xlsx'
import { filesContext } from './FilesProvider'

interface ExcelContext {
  excelMap?: WeakMap<ArrayBuffer, Sheet>
  selectedExcel?: Sheet | null
}

export const excelContext = createContext<ExcelContext>({})

export function ExcelProvider({ children }: PropsWithChildren) {
  const [excelMap] = useState<WeakMap<ArrayBuffer, Sheet>>(new WeakMap())
  const [selectedExcel, setSelectedExcel] = useState<Sheet | null>(null)

  const { buffers, selected } = useContext(filesContext)
  const { getExcelSheets } = useExcel()

  // FileProvider 에서 선택된 파일로 엑셀 Json 을 만들고, 해당 엑셀 데이터를 선택함 //
  useLayoutEffect(() => {
    const buffer = !selected && selected !== 0 ? null : buffers?.[selected]

    if (!buffer) return
    else if (excelMap.has(buffer)) {
      const excelData = excelMap.get(buffer)!
      setSelectedExcel(excelData)
    } else {
      const excelData = getExcelSheets(buffer)
      excelMap.set(buffer, excelData)
      setSelectedExcel(excelData)
    }
  }, [buffers, selected])

  return (
    <excelContext.Provider value={{ excelMap, selectedExcel }}>{children}</excelContext.Provider>
  )
}
