import { FileListContainer } from 'components/file/FileListContainer'
import { GraphContainer } from 'components/graph/GraphContainer'
import { ExcelProvider } from 'providers/ExcelProvider'
import { FilesProvider } from 'providers/FilesProvider'

export default function HomePage() {
  return (
    <main className="PAGE-CONTAINER h-screen">
      <FilesProvider>
        <ExcelProvider>
          <GraphContainer />
        </ExcelProvider>
        <FileListContainer />
      </FilesProvider>
    </main>
  )
}
