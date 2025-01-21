import { GraphStyleType } from '@/@enum/my_excel_enum'

export type DataSheetType = [
  /**
   * 단 수
   */
  number,
  /**
   * 해당 단에 있는 shell 갯수
   */
  number,
  /**
   * 해당 단의 shell 별 세로 길이
   */
  number,
  /**
   * 해당 단의 shell 별 가로 길이
   */
  number,
  /**
   * 전체 도면의 스타일
   */
  GraphStyleType,
  /**
   * 해당 단에서 인접한 단의 어긋남 비율 (각 셀의 가로 길이 * 어긋남 비율) = 어긋남 크기
   */
  number
]

export type ResultSheetType = [number, number, number]
