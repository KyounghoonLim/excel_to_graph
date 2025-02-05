// reference : https://codepen.io/chanthy/pen/WxQoVG
export function drawArrow(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  label?: {
    labelX: number
    labelY: number
    text: string
  }
) {
  ctx.beginPath()
  //variables to be used when creating the arrow
  const headlen = 2
  const angle = Math.atan2(toY - fromY, toX - fromX)

  ctx.save()
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1
  //starting path of the arrow from the start square to the end square
  //and drawing the stroke
  ctx.beginPath()
  ctx.moveTo(fromX, fromY)
  ctx.lineTo(toX, toY)
  ctx.stroke()

  //starting a new path from the head of the arrow to one of the sides of
  //the point
  ctx.beginPath()
  ctx.moveTo(toX, toY)
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 7), toY - headlen * Math.sin(angle - Math.PI / 7))

  //path from the side point of the arrow, to the other side point
  ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 7), toY - headlen * Math.sin(angle + Math.PI / 7))

  //path from the side point back to the tip of the arrow, and then
  //again to the opposite side point
  ctx.lineTo(toX, toY)
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 7), toY - headlen * Math.sin(angle - Math.PI / 7))

  //draws the paths created above
  ctx.stroke()

  if (label) {
    ctx.fillStyle = 'black'
    ctx.fillText(label.text, label.labelX, label.labelY)
  }

  ctx.restore()
}
