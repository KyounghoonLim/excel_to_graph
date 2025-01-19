'use client'

import { filesContext } from 'providers/FilesProvider'
import { useContext } from 'react'

export function FileList() {
  const { files } = useContext(filesContext)

  return <input type="file" className="invisible"></input>
}
