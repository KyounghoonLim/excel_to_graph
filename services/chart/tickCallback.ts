const MIN_STEP = 50 as const

export function tickCallback(value) {
  return Math.max(MIN_STEP, Math.round(value / 50) * 50)
}
