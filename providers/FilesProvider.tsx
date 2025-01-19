'use client'

import { useDragDrop } from 'hooks/useDragDrop'
import { useExcel } from 'hooks/useExcel'
import { useFile } from 'hooks/useFile'
import { createContext, PropsWithChildren, useCallback, useLayoutEffect } from 'react'
import { FixedLengthArray } from 'utils/fixedLengthArray'

interface FilesContext {
  files?: FixedLengthArray<File>
  buffers?: FixedLengthArray<ArrayBuffer>
  addFile?: (file: File) => Promise<void>
  removeFile?: (index: number) => void
}

export const filesContext = createContext<FilesContext>({})

export function FilesProvider({ children }: PropsWithChildren) {
  const { files, buffers, addFile, removeFile } = useFile(5)
  const { readExcelData } = useExcel()

  const onDrop = useCallback(
    async (fileList: FileList) => {
      for (const file of fileList) {
        await addFile(file)
      }
      console.log('done!')
    },
    [addFile]
  )

  const { dragDropRef } = useDragDrop(onDrop)

  useLayoutEffect(() => {
    console.log('files', files)
    console.log('buffers', buffers)
    if (buffers[0]) {
      readExcelData(buffers[0]!)
    }
  }, [files, buffers])

  return (
    <div ref={dragDropRef} className="CONTENT-CONTAINER">
      <filesContext.Provider value={{ files, buffers, addFile, removeFile }}>
        {children}
      </filesContext.Provider>
    </div>
  )
}
