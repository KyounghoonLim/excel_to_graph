const MIN_STEP = 50 as const

export function tickCallback(value) {
  if (value < 0) return -1000
  else if (value === 0) return 0
  return Math.max(MIN_STEP, Math.round(value / 50) * 50)
}
