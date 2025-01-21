import { CanvasWrapper } from 'components/canvas/CanvasWrapper'
import { FileList } from 'components/file/FileList'
import { ExcelProvider } from 'providers/ExcelProvider'
import { FilesProvider } from 'providers/FilesProvider'

export default function HomePage() {
  return (
    <main className="PAGE-CONTAINER h-screen">
      <FilesProvider>
        <ExcelProvider>
          <CanvasWrapper />
        </ExcelProvider>
        <section className="CONTENT-CONTAINER flex flex-col">
          <FileList />
        </section>
      </FilesProvider>
    </main>
  )
}
