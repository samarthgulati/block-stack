class Cartesian {
  static updateShove({x, y, w, h}, shove) {
    const vr = shove.firstElementChild
    const hr = shove.lastElementChild
    const vx = x
    const vy1 = y
    const vy2 = y + h
    vr.setAttribute('x1', vx)
    vr.setAttribute('x2', vx)
    vr.setAttribute('y1', vy1)
    vr.setAttribute('y2', vy2)
    
    const hy = y + (h * 0.5)
    const hx1 = vx
    const hx2 = vx + grid.size
    hr.setAttribute('x1', hx1)
    hr.setAttribute('x2', hx2)
    hr.setAttribute('y1', hy)
    hr.setAttribute('y2', hy)
  }

  static getShove({x, y, w, h}) {
    const shove = document.createElementNS(SVG.NS, 'g')
    const vr = document.createElementNS(SVG.NS, 'line')
    const hr = document.createElementNS(SVG.NS, 'line')
    vr.setAttribute('stroke', 'hsl(207, 90%, 54%)')
    vr.setAttribute('stroke-width', 2)
    hr.setAttribute('stroke', 'hsl(207, 90%, 54%)')
    hr.setAttribute('stroke-width', 4)
    shove.appendChild(vr)
    shove.appendChild(hr)
    shove.style.pointerEvents = 'none'
    Cartesian.updateShove({x, y, w, h}, shove)
    shove.style.opacity = 0
    return shove
  }
  _drawGrid() {
    this._grid = document.createElementNS(SVG.NS, 'g');
    [...Array(this.board)].forEach((b,x) => {
      [...Array(this.board)].forEach((b,y) => {
        const rect = SVG.getRect({
          x: x * this.size,
          y: y * this.size,
          w: this.size,
          h: this.size,
          stroke: 'grey',
          fill: 'none'
        })
        this._grid.appendChild(rect)
      })
    })
    this.svg.appendChild(this._grid)
  }
  _start(e) {
    if(this._dragging) return
    this._dragging = true
    this._update(e.detail)
  }
  _update(e) {
    if(!this._dragging) return
    this._control.update(InputEvents.getPoint(e))
    this._control.anchor = nums[this._selectedNum].shoveCoords
    const w = Math.round(this._control.deltaX / grid.size)
    nums[this._selectedNum].updateWidth(w)
  }
  _end(e) {
    if(!this._dragging) return
    this._dragging = false
    nums[this._selectedNum].updateArea()
    this._update(e)
    this._control.anchor = nums[this._selectedNum].shoveCoords
    this._control.reset()
  }
  _handleSelect(e) {
    const id = e.detail
    if(this._selectedNum === id) {
      this._selectedNum = null
      this._dragging = false
    } else {
      this._selectedNum = id
      const anchor = nums[id].shoveCoords
      this._control.anchor = anchor
      this._control.update(anchor)
    }
    this._control.toggleVisibility()
  }
  _deselect() {
    if(this._selectedNum) {
      nums[this._selectedNum].toggleSelect()
      this._control.toggleVisibility()
      this._selectedNum = null
    }
  }
  _addEventListeners() {
    const events = InputEvents.EVENTS
    this._start = this._start.bind(this)
    this.svg.addEventListener('start-drag', this._start)
    this.svg.addEventListener(events.down, this._deselect)
    this._update = this._update.bind(this)
    this.svg.addEventListener(events.move, this._update)
    this._end = this._end.bind(this)
    this.svg.addEventListener(events.up, this._end)
    this.svg.addEventListener(events.cancel, this._end)
    this._handleSelect = this._handleSelect.bind(this)
    this.svg.addEventListener('toggle-select', this._handleSelect)
  }
  constructor(
    board = 20,
    width = window.innerWidth,
    height = window.innerHeight
  ) {
    this._selectedNum = null
    this._dragging = false
    this.board = board
    this.size = Math.min(width / board, height / board)
    this.svg = document.createElementNS(SVG.NS, "svg")
    this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
    this.svg.setAttribute("width", `${width}px`)
    this.svg.setAttribute("height", `${height}px`)
    document.body.appendChild(this.svg)
    this._control = new Control(this.svg, this.size * 0.5)
    this._addEventListeners()
    this._drawGrid()
  }
}
