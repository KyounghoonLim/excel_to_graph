'use client'

import { useCallback, useState } from 'react'
import { FileUploadHelper } from 'services/fileUploadHelper'
import { FixedLengthArray } from 'utils/fixedLengthArray'

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

      setFiles((_) => {
        const _files = [..._]
        if (!_files[maxLength - 1]) {
          for (let i = 0; i < maxLength; i++) {
            if (!_files[i]) {
              _files[i] = targetFile
              break
            }
          }
        }
        return _files
      })
      setBuffers((_) => {
        const _buffers = [..._]
        if (!_buffers[maxLength - 1]) {
          for (let i = 0; i < maxLength; i++) {
            if (!_buffers[i]) {
              _buffers[i] = targetBuffer
              break
            }
          }
        }
        return _buffers
      })
    },
    [maxLength, fileUploadHelper]
  )

  const removeFile = useCallback(
    (index?: number) => {
      setFiles((_files) => {
        if (index) _files[index] = null
        else {
          for (let i = maxLength - 1; i > -1; i--) {
            if (_files[i]) {
              _files[i] = null
            }
            break
          }
        }

        return _files
      })
      setBuffers((_buffers) => {
        if (index) _buffers[index] = null
        else {
          for (let i = maxLength - 1; i > -1; i--) {
            if (_buffers[i]) {
              _buffers[i] = null
            }
            break
          }
        }

        return _buffers
      })
    },
    [maxLength]
  )

  return { files, buffers, addFile, removeFile }
}
