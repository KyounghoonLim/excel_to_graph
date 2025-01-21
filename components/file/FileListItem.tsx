'use client'

import { MouseEvent, useCallback, useContext } from 'react'
import { filesContext } from 'providers/FilesProvider'
import ExcelImage from 'images/excel-image.svg'
import RemoveIcon from 'icons/remove-icon.svg'
import clsx from 'clsx'

export function FileListItem({ file, index, selected }: { file: File; index: number; selected: boolean }) {
  const { removeFile, selectFile } = useContext(filesContext)

  const cliclHandler = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      selectFile?.(index)
    },
    [index, selectFile]
  )

  const removeClickHandler = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      removeFile?.(index)
    },
    [index, removeFile]
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
            onClick={removeClickHandler}
          >
            <RemoveIcon />
          </button>
        </div>
      )}
    </>
  )
}
