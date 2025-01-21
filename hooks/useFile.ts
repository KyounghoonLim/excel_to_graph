'use client'

import { useCallback, useRef, useState } from 'react'
import { FileUploadHelper } from 'services/fileUploadHelper'
import { FixedLengthArray } from 'utils/FixedLengthArray'

export interface FileObject {
  file: File
  buffer: ArrayBuffer
}

/**
 * file (UI 용) 과 ArrayBuffer (엑셀용) 두 개를 동시 관리
 */
export function useFile(maxLength: number = 5) {
  const { current: fileUploadHelper } = useRef<FileUploadHelper>(new FileUploadHelper())
  const keyRef = useRef<string | null>(null)

  const [fileObjects, setFileObjects] = useState<FixedLengthArray<FileObject>>(new FixedLengthArray(maxLength))
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const addFile = useCallback(
    async (file: File) => {
      const buffer = await fileUploadHelper.uploadFileAsBlob(file)
      setFileObjects((temp) => temp.arrayPushedItem({ file, buffer }))
    },
    [fileUploadHelper]
  )

  const removeFile = useCallback((index?: number) => {
    setFileObjects((temp) => {
      const newObj = temp.arrayPopedIndex(index)

      for (let i = 0; i < newObj.length; i++) {
        const obj = newObj[i]
        // fileObjects 배열이 바뀌었을 때 선택된 항목이 있는 경우 해당 항목의 인덱스로 select 변경 //
        if (obj && keyRef.current === `${obj.file?.name}-${obj.file?.size}`) {
          selectFile(i)
          return newObj
        }
      }
      // files 배열이 바뀌었는데, 선택된 파일이 없는 경우 초기화 함 //
      setSelectedIndex(null)
      keyRef.current = null
      return newObj
    })
  }, [])

  const selectFile = useCallback(
    (index: number) => {
      const obj = fileObjects[index]

      if (!obj) return
      else {
        setSelectedIndex(index)
        keyRef.current = `${obj.file.name}-${obj.file.size}`
      }
    },
    [fileObjects]
  )

  return { fileObjects, selectedIndex, addFile, removeFile, selectFile }
}
