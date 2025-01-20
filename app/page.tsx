import { FileList } from 'components/file/FileList'
import { FilesProvider } from 'providers/FilesProvider'

export default function HomePage() {
  return (
    <main className="PAGE-CONTAINER h-screen">
      <FilesProvider>
        <section className="CONTENT-CONTAINER flex flex-col justify-end">
          <FileList />
        </section>
      </FilesProvider>
    </main>
  )
}
