'use client'

import { useDragDrop } from 'hooks/useDragDrop'
import { FileObject, useFile } from 'hooks/useFile'
import { createContext, PropsWithChildren } from 'react'
import { FixedLengthArray } from 'utils/FixedLengthArray'

interface FilesContext {
  fileObjects?: FixedLengthArray<FileObject>
  selectedIndex?: number | null
  addFile?: (file: File) => Promise<void>
  removeFile?: (index: number) => void
  selectFile?: (index: number) => void
}

export const filesContext = createContext<FilesContext>({})

export function FilesProvider({ children }: PropsWithChildren) {
  const { fileObjects, selectedIndex, addFile, removeFile, selectFile } = useFile(5)
  const { dragDropRef } = useDragDrop(async (fileList: FileList) => {
    for (const file of fileList) {
      await addFile(file)
    }
  })

  return (
    <div ref={dragDropRef} className="CONTENT-CONTAINER">
      <filesContext.Provider
        value={{
          fileObjects,
          selectedIndex,
          addFile,
          removeFile,
          selectFile,
        }}
      >
        {children}
      </filesContext.Provider>
    </div>
  )
}
