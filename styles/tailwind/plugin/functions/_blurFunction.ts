export function blurredColor(color: string) {
  return {
    backgroundColor: `${color}CC`,
    backdropFilter: 'blur(4px)',
  }
}
