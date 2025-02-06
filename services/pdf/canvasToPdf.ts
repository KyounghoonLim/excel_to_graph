import jsPDF from 'jspdf'
import { MyChart } from 'services/chart/@types/MyChart'

export function exportChartToPDF(chart: MyChart) {
  try {
    const imgData = chart.toBase64Image()
    // PDF 문서 크기 설정 (A4 사이즈, 가로 모드)
    const pdf = new jsPDF('landscape', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth() // 297mm
    const pageHeight = pdf.internal.pageSize.getHeight() // 210mm

    // 이미지 크기 조정 (비율 유지)
    const aspectRatio = chart.canvas.width / chart.canvas.height
    let imgWidth = pageWidth // 가득 채우기
    let imgHeight = imgWidth / aspectRatio

    // 높이가 넘칠 경우, 높이를 기준으로 조정
    if (imgHeight > pageHeight) {
      imgHeight = pageHeight
      imgWidth = imgHeight * aspectRatio
    }

    // 중앙 정렬을 위한 좌표 계산
    const x = (pageWidth - imgWidth) / 2
    const y = (pageHeight - imgHeight) / 2

    // PDF에 이미지 추가
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
    pdf.save(chart.$title || 'chart.pdf')
  } catch (err) {
    window.alert(err)
  }
}
