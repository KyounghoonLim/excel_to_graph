import { Union } from '../@types/union'

export const GraphStyle = {
  1: 'STYLE_1',
  2: 'STYLE_2',
} as const

export type GraphStyleType = Union<typeof GraphStyle>
