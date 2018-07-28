class SVG {
  static get NS() {
    return 'http://www.w3.org/2000/svg'
  }
  static updateRect({x, y, w, h, stroke, fill}, rect) {
    rect.setAttribute('x', x)
    rect.setAttribute('y', y)
    rect.setAttribute('width', w)
    rect.setAttribute('height', h)
    rect.setAttribute('stroke', stroke)
    rect.setAttribute('fill', fill)
  }
  static getRect({x, y, w, h, stroke, fill}) {
    const rect = document.createElementNS(SVG.NS, 'rect')
    SVG.updateRect({x, y, w, h, stroke, fill}, rect)
    return rect
  }
  static updateCircle({cx, cy, r, stroke, fill}, circle) {
    circle.setAttribute('cx', cx)
    circle.setAttribute('cy', cy)
    circle.setAttribute('r', r)
    circle.setAttribute('stroke', stroke)
    circle.setAttribute('fill', fill)
  }
  static getCircle({cx, cy, r, stroke, fill}) {
    const circle = document.createElementNS(SVG.NS, 'circle')
    SVG.updateCircle({cx, cy, r, stroke, fill}, circle)
    return circle
  }
}
