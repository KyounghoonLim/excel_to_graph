'use client'

import { RefCallback, useCallback, useLayoutEffect, useRef } from 'react'

interface DragHandler {
  (files: FileList): void | Promise<void>
}

export function useDragDrop(onDrop?: DragHandler): { dragDropRef: RefCallback<HTMLElement> } {
  const ref = useRef<HTMLElement | null>(null)

  const dragoverHandler = useCallback((event: DragEvent) => {
    event.preventDefault()
    ref.current?.classList.add('drag-over')
  }, [])

  const dragleaveHandler = useCallback((event: DragEvent) => {
    if (ref.current?.contains(event.relatedTarget as Node)) return
    else ref.current?.classList.remove('drag-over')
  }, [])

  const dropHandler = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      ref.current?.classList.remove('drag-over')

      if (!event.dataTransfer?.files.length) return
      else {
        onDrop?.(event.dataTransfer.files)
      }
    },
    [onDrop]
  )

  const dragDropRef = useCallback<RefCallback<HTMLElement>>(
    (element: HTMLElement) => {
      ref.current = element
      ref.current?.addEventListener('dragover', dragoverHandler)
      ref.current?.addEventListener('dragleave', dragleaveHandler)
      ref.current?.addEventListener('drop', dropHandler)
    },
    [dragoverHandler, dragleaveHandler, dropHandler]
  )

  useLayoutEffect(() => {
    return () => {
      ref.current?.removeEventListener('dragover', dragoverHandler)
      ref.current?.removeEventListener('dragleave', dragleaveHandler)
      ref.current?.removeEventListener('drop', dropHandler)
    }
  }, [dragoverHandler, dragleaveHandler, dropHandler])

  return {
    dragDropRef,
  }
}
