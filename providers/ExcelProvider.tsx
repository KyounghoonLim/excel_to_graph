'use client'

import { useExcel } from 'hooks/useExcel'
import { createContext, PropsWithChildren, useContext, useLayoutEffect, useState } from 'react'
import { filesContext } from './FilesProvider'
import { DataSheetType, ResultSheetType } from '@/@types/my_excel_type'

export interface MyExcelDataType {
  data: DataSheetType
  result: ResultSheetType
}

interface ExcelContext {
  excelMap?: WeakMap<ArrayBuffer, MyExcelDataType>
  selectedExcel?: MyExcelDataType | null
}

export const excelContext = createContext<ExcelContext>({})

export function ExcelProvider({ children }: PropsWithChildren) {
  const [excelMap] = useState<WeakMap<ArrayBuffer, MyExcelDataType>>(new WeakMap())
  const [selectedExcel, setSelectedExcel] = useState<MyExcelDataType | null>(null)

  const { getExcelData } = useExcel()
  const { fileObjects, removeFile, selectedIndex } = useContext(filesContext)

  // FileProvider 에서 선택된 파일로 엑셀 JSON 을 만들고, 해당 엑셀 데이터를 선택함 //
  useLayoutEffect(() => {
    const buffer = fileObjects?.[selectedIndex]?.buffer

    if (!buffer) {
      setSelectedExcel(null)
    } else if (excelMap.has(buffer)) {
      const excelData = excelMap.get(buffer) as MyExcelDataType
      setSelectedExcel(excelData)
    } else {
      const excelData = getExcelData(buffer) as MyExcelDataType

      if (!excelData.data || !excelData.result) {
        alert(
          '엑셀 파일의 규격이 맞지 않습니다.\n("data" 시트와 "result" 시트는 필수입니다.)\n\n파일을 리스트에서 제거합니다.'
        )
        removeFile(selectedIndex)
        return
      }

      excelMap.set(buffer, excelData)
      setSelectedExcel(excelData)
    }
  }, [fileObjects, selectedIndex])

  return <excelContext.Provider value={{ excelMap, selectedExcel }}>{children}</excelContext.Provider>
}
