'use client'

import { useCallback, useState } from 'react'
import { FileUploadHelper } from 'services/fileUploadHelper'
import { FixedLengthArray } from 'utils/FixedLengthArray'

/**
 * file (UI 용) 과 ArrayBuffer (엑셀용) 두 개를 동시 관리
 */
export function useFile(maxLength: number = 5) {
  const [files, setFiles] = useState<FixedLengthArray<File>>(new FixedLengthArray(maxLength))
  const [buffers, setBuffers] = useState<FixedLengthArray<ArrayBuffer>>(
    new FixedLengthArray(maxLength)
  )
  const [fileUploadHelper] = useState<FileUploadHelper>(new FileUploadHelper())

  const addFile = useCallback(
    async (targetFile: File) => {
      const targetBuffer = await fileUploadHelper.uploadFileAsBlob(targetFile)
      setFiles((tempFiles) => tempFiles.arrayPushedItem(targetFile))
      if (targetBuffer) {
        setBuffers((tempBuffers) => tempBuffers.arrayPushedItem(targetBuffer))
      }
    },
    [fileUploadHelper]
  )

  const removeFile = useCallback((index?: number) => {
    setFiles((tempFiles) => tempFiles.arrayPopedIndex(index))
    setBuffers((tempBuffers) => tempBuffers.arrayPopedIndex(index))
  }, [])

  return { files, buffers, addFile, removeFile }
}
