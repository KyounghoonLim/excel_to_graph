import { GraphStyleType } from '@/@enum/my_excel_enum'

export type DataSheetType = [
  {
    0: '단수'
    1: '단별 shell 개수'
    2: '세로'
    3: '가로'
    4: '모양'
    5: '교차비율'
  },
  ...Array<DataSheetData>
]

export type ResultSheetType = [
  {
    0: '추가수직'
    1: '기본수직'
    2: '기본수평'
  },
  ...Array<ResultSheetData>
]

export type DataSheetData = {
  /**
   * 단 수
   */
  0: number
  /**
   * 해당 단에 있는 shell 갯수
   */
  1: number
  /**
   * 해당 단의 shell 별 세로 길이
   */
  2: number
  /**
   * 해당 단의 shell 별 가로 길이
   */
  3: number
  /**
   * 전체 도면의 스타일
   */
  4: GraphStyleType
  /**
   * 해당 단에서 인접한 단의 어긋남 비율 (각 셀의 가로 길이 * 어긋남 비율) = 어긋남 크기
   */
  5: number
}

export type ResultSheetData = {
  0: string
  1: string
  2: string
}
