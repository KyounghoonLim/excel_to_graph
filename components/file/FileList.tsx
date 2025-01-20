'use client'

import { filesContext } from 'providers/FilesProvider'
import { useCallback, useContext } from 'react'
import { FileItem } from './FileItem'

export function FileList() {
  const { files, selected, selectFile } = useContext(filesContext)

  const onClick = useCallback((index: number) => selectFile!(index), [selectFile])

  return (
    <>
      {files?.isExist() ? (
        <div className="h-[200px] flex items-center gap-4 mt-auto p-4 rounded-lg bg-white shadow-md">
          {files?.map(
            (file, index) =>
              file && (
                <FileItem
                  key={`${file.name}-${file.size}-${index}`}
                  index={index}
                  selected={selected === index}
                  onClick={onClick}
                />
              )
          )}
        </div>
      ) : (
        <div className="flex-col-center gap-8">
          <h1 className="typograph-20 font-bold">Excel to Graph Beta 😎</h1>
          <p className="typograph-16 text-center">
            엑셀파일<i className="italic">(xlsx, xlsm)</i> 을 드래그&드랍하여 업로드하세요
            <br />
            <br />
            파일은 최대 5개 까지 업로드 가능합니다
          </p>
        </div>
      )}
    </>
  )
}
