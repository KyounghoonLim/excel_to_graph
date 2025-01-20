'use client'

import { useDragDrop } from 'hooks/useDragDrop'
import { useExcel } from 'hooks/useExcel'
import { useFile } from 'hooks/useFile'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { FixedLengthArray } from 'utils/FixedLengthArray'

interface FilesContext {
  files?: FixedLengthArray<File>
  buffers?: FixedLengthArray<ArrayBuffer>
  addFile?: (file: File) => Promise<void>
  removeFile?: (index: number) => void
  selected?: number | null
  selectFile?: (index: number) => void
}

export const filesContext = createContext<FilesContext>({})

export function FilesProvider({ children }: PropsWithChildren) {
  const { files, buffers, addFile, removeFile } = useFile(5)
  const [selected, setSelected] = useState<number | null>(null)
  const selectedRef = useRef<string | null>(null)

  const onDrop = useCallback(
    async (fileList: FileList) => {
      for (const file of fileList) {
        await addFile(file)
      }
    },
    [addFile]
  )

  const { dragDropRef } = useDragDrop(onDrop)

  const selectFile = useCallback(
    (index: number) => {
      const file = files[index]

      if (!file) return
      else {
        setSelected(index)
        selectedRef.current = `${file.name}-${file.size}`
      }
    },
    [files]
  )

  useLayoutEffect(() => {
    if (!selected && selected !== 0) return
    else {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (selectedRef.current === `${file?.name}-${file?.size}`) {
          return selectFile(i)
        }
        setSelected(null)
        selectedRef.current = null
      }
    }
  }, [files])

  const { getSheet } = useExcel()

  useLayoutEffect(() => {
    if (!selected && selected !== 0) return
    else {
      console.log(getSheet(buffers[selected]!))
    }
  }, [selected])

  return (
    <div ref={dragDropRef} className="CONTENT-CONTAINER">
      <filesContext.Provider value={{ files, buffers, addFile, removeFile, selected, selectFile }}>
        {children}
      </filesContext.Provider>
    </div>
  )
}
