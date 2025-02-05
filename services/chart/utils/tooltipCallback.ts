export function tooltipLabelCallback(tooltip) {
  if (!tooltip) return ''
  else {
    try {
      const { dataIndex, dataset } = tooltip
      const { label, data } = dataset
      const item = data[dataIndex]

      return `${label}: (${item.x - item.offset}, ${item.y})`
    } catch {
      return ''
    }
  }
}

export function tooltipFooterCallback(tooltips) {
  const tooltip = tooltips[0]
  if (!tooltip) return ''
  else {
    try {
      const { dataIndex, dataset } = tooltip
      const { data } = dataset
      const item = data[dataIndex]
      return `차트 오프셋: ${item.offset}`
    } catch {
      return ''
    }
  }
}
