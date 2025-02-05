import { Union } from '../@types/union'

export const GraphStyle = {
  STYLE_1: 1,
  STYLE_2: 2,
} as const

export type GraphStyleType = Union<typeof GraphStyle>
