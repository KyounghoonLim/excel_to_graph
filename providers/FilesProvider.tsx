'use client'

import { useDragDrop } from 'hooks/useDragDrop'
import { useFile } from 'hooks/useFile'
import { createContext, PropsWithChildren, useCallback } from 'react'
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

  const onDrop = useCallback(
    async (fileList: FileList) => {
      for (const file of fileList) {
        await addFile(file)
      }
    },
    [addFile]
  )

  const { dragDropRef } = useDragDrop(onDrop)

  return (
    <div ref={dragDropRef} className="CONTENT-CONTAINER">
      <filesContext.Provider value={{ files, buffers, addFile, removeFile }}>
        {children}
      </filesContext.Provider>
    </div>
  )
}
