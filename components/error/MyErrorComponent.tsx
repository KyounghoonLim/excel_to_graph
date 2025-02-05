'use client'

import { ErrorComponent } from 'next/dist/client/components/error-boundary'
import { useCallback } from 'react'

export const MyErrorComponent: ErrorComponent = function ({ error, reset }) {
  const clickHandler = useCallback(() => {
    if (window.confirm('엑셀 파일 예시를 다운로드 하시겠습니까?')) {
      const link = document.createElement('a')
      link.href = location.origin + '/files/example.xlsx'
      link.click()
    }
  }, [])

  return (
    <main className="CONTENT-CONTAINER w-full h-full gap-8">
      <h1 className="typograph-38 font-bold text-center">⚠️ 에러가 발생했습니다. 😫</h1>
      <p className="typograph-16 text-center font-medium bg-[#00000088] text-white px-4 py-5 rounded-md">
        reason: {error.message}
      </p>
      <div className="flex-col-center gap-4">
        <span className="text-center">
          해당 문제는&nbsp;
          <span className="text-blue-500 font-bold underline underline-offset-4 cursor-pointer" onClick={clickHandler}>
            엑셀 파일의 규격
          </span>
          &nbsp;이 잘못되었거나, 다른 이유일 수 있습니다.
          <br />
          페이지를 새로고침하여 다시 시작하십시오.
        </span>
        <button
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-[#000000dd] cursor-pointer"
          onClick={reset}
        >
          새로고침
        </button>
      </div>
    </main>
  )
}
