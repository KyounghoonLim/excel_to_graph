'use client'

import { filesContext } from 'providers/FilesProvider'
import { useContext } from 'react'
import { FileListItem } from './FileListItem'

export function FileList() {
  const { fileObjects, selectedIndex } = useContext(filesContext)

  return (
    <div className="absolute bottom-4 h-[200px] flex items-center gap-4 mt-auto p-4 rounded-lg bg-white shadow-md">
      {fileObjects?.map(
        (obj, index) =>
          obj?.file && (
            <FileListItem
              key={`${obj.file.name}-${obj.file.size}-${index}`}
              file={obj.file}
              index={index}
              selected={selectedIndex === index}
            />
          )
      )}
    </div>
  )
}
