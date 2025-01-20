'use client'

import { useContext, useState } from 'react'
import { filesContext } from 'providers/FilesProvider'
import ExcelImage from 'images/excel-image.svg'
import RemoveIcon from 'icons/remove-icon.svg'

export function FileItem({ index }: { index: number }) {
  const { files, removeFile } = useContext(filesContext)
  const [file] = useState<File | null>(files![index])

  return (
    <>
      {file && (
        <div className="relative flex-col-center gap-4 p-2 rounded-lg hover:bg-[#00000066] cursor-pointer">
          <ExcelImage />
          <div
            className="absolute top-[-12px] right-[-12px] w-6 h-6 flex-row-center rounded-[50%] bg-red-500 hover:bg-red-600 scale-90 hover:scale-100 duration-150 cursor-pointer"
            onClick={() => removeFile!(index)}
          >
            <RemoveIcon />
          </div>
          <p className="typograph-14 truncate">{file?.name}</p>
        </div>
      )}
    </>
  )
}
