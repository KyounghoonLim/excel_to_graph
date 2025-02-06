'use client'

import { filesContext } from 'providers/FilesProvider'
import { useCallback, useContext } from 'react'
import { FileList } from './FileList'

export function FileListContainer() {
  const { fileObjects } = useContext(filesContext)

  const downloadExcelFile = useCallback(() => {
    if (window.confirm('엑셀 파일 예시를 다운로드 하시겠습니까?')) {
      const link = document.createElement('a')
      link.href = location.origin + '/files/example.xlsx'
      link.click()
    }
  }, [])

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
          <div className="text-center text-gray-400 typograph-12">
            이 버전은 테스트용입니다.
            <br />
            성능 이슈 또는 버그가 발생할 수 있습니다.
          </div>
          <div className="fixed bottom-8 flex typograph-14">
            엑셀 파일의 규격이 궁금하다면&nbsp;
            <br />
            <span
              className="text-blue-500 font-bold underline underline-offset-4 cursor-pointer"
              onClick={downloadExcelFile}
            >
              엑셀 파일의 규격
            </span>
            &nbsp;을 참고하세요
          </div>
        </div>
      )}
    </>
  )
}
