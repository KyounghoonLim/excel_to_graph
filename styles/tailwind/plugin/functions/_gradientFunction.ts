export function gradientFading(fromColor: string) {
  const fadingGradient = fromColor.includes('gradient')
    ? fromColor
    : `linear-gradient(${fromColor},${fromColor})`

  return {
    '&::after': {
      width: '100vw',
      height: '100vh',
      content: fadingGradient,
      display: 'block',
      position: 'fixed',
      top: '0',
      left: '0',
      pointerEvents: 'none',
      backgroundColor: fromColor,
      '@apply animate-fade-out': true,
    },
  }
}
