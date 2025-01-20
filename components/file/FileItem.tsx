'use client'

import { useCallback, useContext, useState } from 'react'
import { filesContext } from 'providers/FilesProvider'
import ExcelImage from 'images/excel-image.svg'
import RemoveIcon from 'icons/remove-icon.svg'
import clsx from 'clsx'

export function FileItem({
  index,
  selected,
  onClick,
}: {
  index: number
  selected: boolean
  onClick: (index: number) => void
}) {
  const { files, removeFile } = useContext(filesContext)
  const [file] = useState<File | null>(files![index])

  const cliclHandler = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      onClick(index)
    },
    [index, onClick]
  )

  return (
    <>
      {file && (
        <div
          className={clsx(
            'relative flex-col-center gap-4 p-2 rounded-lg cursor-pointer',
            selected
              ? "dim after:outline after:outline-4 after:outline-[#73ED26] after:bg-[url('/icons/checked-icon.svg')] after:bg-[length:50px_50px] after:bg-no-repeat after:bg-center after:transition-all"
              : 'hover:dim shadow-md'
          )}
          onClick={cliclHandler}
        >
          <ExcelImage />
          <p className="typograph-14 truncate">{file?.name}</p>
          <button
            className="absolute top-[-12px] right-[-12px] w-6 h-6 flex-row-center rounded-[50%] bg-red-500 hover:bg-red-600 scale-90 hover:scale-100 duration-150 cursor-pointer z-[101] shadow-md"
            onClick={() => removeFile!(index)}
          >
            <RemoveIcon />
          </button>
        </div>
      )}
    </>
  )
}
