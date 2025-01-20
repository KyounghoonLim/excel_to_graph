'use client'

import { createContext } from 'react'
import { Sheet } from 'xlsx'

interface ExcelContext {
  excelDatas: WeakMap<File, Sheet>
}

export const excelContext = createContext()

export function ExcelProvider() {
  return <div></div>
}
