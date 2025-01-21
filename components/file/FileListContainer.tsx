'use client'

import { filesContext } from 'providers/FilesProvider'
import { useContext } from 'react'
import { FileList } from './FileList'

export function FileListContainer() {
  const { fileObjects } = useContext(filesContext)

  return (
    <>
      {fileObjects?.isExist() ? (
        <FileList />
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
