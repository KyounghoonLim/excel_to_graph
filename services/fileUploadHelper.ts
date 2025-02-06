const fileFilterRegex = /\.xls(x|m)?$/i

export class FileUploadHelper {
  constructor() {}

  filterFile(_file: File): boolean {
    return fileFilterRegex.test(_file.name.trim())
  }

  uploadFile(_file: File) {
    if (!this.filterFile(_file)) {
      alert('엑셀 파일만 업로드가 가능합니다.')
      return
    } else {
      return _file
    }
  }

  async uploadFileAsBlob(_file: File) {
    if (!this.filterFile(_file)) {
      alert('엑셀 파일만 업로드가 가능합니다.')
      return
    }

    try {
      return await _file.arrayBuffer()
    } catch {
      alert('파얼 업로드에 실패했습니다.')
      return null
    }
  }
}
