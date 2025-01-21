import { Union } from '../@types/union'

export const SheetName = {
  0: 'data',
  1: 'result',
} as const

export const GraphStyle = {
  1: 'STYLE_1',
  2: 'STYLE_2',
} as const

export type SheetNameType = Union<typeof SheetName>
export type GraphStyleType = Union<typeof GraphStyle>
