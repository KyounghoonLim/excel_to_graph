export function dimColor(color: string) {
  return {
    '@apply dim': true,
    '&::before': {
      backgroundColor: `${color}`,
    },
  }
}
