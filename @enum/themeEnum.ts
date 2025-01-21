import { Union } from '../@types/union'

export const ThemeEnum = {
  0: 'light',
  1: 'dark',
} as const

export type ThemeType = Union<typeof ThemeEnum>
