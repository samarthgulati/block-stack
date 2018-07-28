class Control {
  get deltaX() {
    // (x1-x2), (y1 - y2)
    // projection A = atan(0.5)
    // (x1-x2) * cosA , (y1 - y2) * sinA 
    // Mag 
    // (((x1-x2) * cosA) ** 2 + ((y1 - y2) * sinA) ** 2) ** 0.5
    // div by side 
    // (((x1-x2) * cosA) ** 2 + ((y1 - y2) * sinA) ** 2) ** 0.5 / (0.5 * size * cosA)
    // 2 * ((x1-x2) ** 2 + ((y1 - y2) * tanA) ** 2) ** 0.5 / size
    const x = (this._x - (this._anchor.x - this._r))
    const y = (this._y - (this._anchor.y - this._r))
    const angle = 180 * Math.atan2(y, x) / Math.PI
    const posA = -25
    const negA = 150
    const delta = 60
    if(angle > posA - delta && angle < posA + delta) {
      return Math.round(2 * (( x ** 2 + (y * 0.5) ** 2) ** 0.5) / grid.size)
    } else if(angle > negA - delta && angle < negA + delta) {
      return -Math.round(2 * (( x ** 2 + (y * 0.5) ** 2) ** 0.5) / grid.size)
    } else {
      return 0
    }
    
  }
  update({x, y}) {
    this._x = x - this._r
    this._y = y - this._r
    this._thumb.style.transform = `translate(${this._x}px, ${this._y}px)`
  }
  _handleDown(e) {
    e.preventDefault()
    this._thumb.dispatchEvent(new CustomEvent('start-drag', {
      bubbles: true,
      detail: e
    }))
  }
  reset() {
    this._thumb.style.pointerEvents = 'none'
    const animation = this._thumb.animate([{
      transform: `translate(${this._x}px, ${this._y}px)`
    },{
      transform: `translate(${this._anchor.x - this._r}px, ${this._anchor.y - this._r}px)`
    }], {
      duration: 300,
      easing: 'ease-in-out'
    })
    animation.onfinish = _ => {
      this._thumb.style.pointerEvents = 'all'
      this.update(this._anchor)
    }
  }
  toggleVisibility() {
    this._visible = !this._visible
    if(this._visible) {
      this._thumb.style.opacity = 1
    } else {
      this._thumb.style.opacity = 0
    }
  }
  _addEventListeners() {
    this._handleDown = this._handleDown.bind(this)
    const events = InputEvents.EVENTS
    this._thumb.addEventListener(events.down, this._handleDown)
  }
  set anchor(a) {
    this._anchor = a
  }
  constructor(svg, r = 48) {
    this._anchor = {
      x: 0,
      y: 0
    }
    this._angle = Math.PI / 6
    this._r = r
    this._x = 0
    this._y = 0
    this._thumb = SVG.getCircle({
      cx: r,
      cy: r,
      r,
      stroke: 'none',
      fill: 'hsla(200, 85%, 50%, 0.5)'
    })
    this._visible = true
    this.toggleVisibility()
    this._addEventListeners()
    svg.appendChild(this._thumb)
  }
}