'use client'

import { filesContext } from 'providers/FilesProvider'
import { useContext, useLayoutEffect, useState } from 'react'
import { FileListItem } from './FileListItem'
import FileIcon from 'icons/file-icon.svg'
import CloseArrowIcon from 'icons/close-arrow-icon.svg'
import clsx from 'clsx'

export function FileList() {
  const { fileObjects, selectedIndex } = useContext(filesContext)
  const [isShow, setIsShow] = useState<boolean>(true)

  useLayoutEffect(() => {
    if (selectedIndex === undefined || selectedIndex === null) return
    else setIsShow(false)
  }, [selectedIndex])

  return (
    <>
      <div
        className={clsx(
          'absolute bottom-4 left-0 h-[200px] flex items-center gap-4 mt-auto p-4 pr-16 rounded-lg bg-white shadow-md z-10 overflow-hidden',
          isShow ? 'animate-slide-in' : 'animate-slide-out'
        )}
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">파일 리스트</h3>
          <div className="flex items-center gap-4">
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
        </div>
        <button
          className="absolute right-0 w-10 h-full flex-row-center bg-[#f3f3f3] hover:bg-[#e9e9e9]"
          onClick={() => setIsShow(false)}
          title="파일 리스트 닫기"
        >
          <CloseArrowIcon className="drop-shadow-md" />
        </button>
      </div>
      <button
        className="absolute bottom-4 left-4 w-12 h-12 flex-row-center bg-black rounded-[50%] scale-90 hover:scale-100 cursor-pointer duration-150"
        onClick={() => setIsShow(true)}
        title="파일 리스트 열기"
      >
        <FileIcon />
      </button>
    </>
  )
}
