'use client'

import { MyErrorComponent } from 'components/error/MyErrorComponent'
import { FileListContainer } from 'components/file/FileListContainer'
import { ChartContainer } from 'components/chart/ChartContainer'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { ExcelProvider } from 'providers/ExcelProvider'
import { FilesProvider } from 'providers/FilesProvider'

export default function HomePage() {
  return (
    <main className="PAGE-CONTAINER h-screen">
      <ErrorBoundary errorComponent={MyErrorComponent}>
        <FilesProvider>
          <ExcelProvider>
            <ChartContainer />
          </ExcelProvider>
          <FileListContainer />
        </FilesProvider>
      </ErrorBoundary>
    </main>
  )
}
