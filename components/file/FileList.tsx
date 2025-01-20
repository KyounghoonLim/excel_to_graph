'use client'

import { filesContext } from 'providers/FilesProvider'
import { useContext } from 'react'
import { FileItem } from './FileItem'

export function FileList() {
  const { files } = useContext(filesContext)
  return (
    <div className="w-[600px] h-[300px] flex items-center gap-4 p-4 rounded-lg">
      {files?.map(
        (file, index) =>
          file && <FileItem key={`${file.name}-${file.size}-${index}`} index={index} />
      )}
    </div>
  )
}
