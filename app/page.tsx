import { MyErrorComponent } from 'components/error/MyErrorComponent'
import { FileListContainer } from 'components/file/FileListContainer'
import { GraphContainer } from 'components/graph/GraphContainer'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import { ExcelProvider } from 'providers/ExcelProvider'
import { FilesProvider } from 'providers/FilesProvider'

export default function HomePage() {
  return (
    <main className="PAGE-CONTAINER h-screen">
      <ErrorBoundary errorComponent={MyErrorComponent}>
        <FilesProvider>
          <ExcelProvider>
            <GraphContainer />
          </ExcelProvider>
          <FileListContainer />
        </FilesProvider>
      </ErrorBoundary>
    </main>
  )
}
