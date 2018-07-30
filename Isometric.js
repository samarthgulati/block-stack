let grid = null
class Isometric {
  getCoord(x,y, z = 0) {
    return [
      this.origin[0] + (x + y) * this.hsize, 
      this.origin[1] + (y - x) * this.qsize - z * this.zsize
    ]
  }
  _start(e) {
    if(this._dragging) return
    this._dragging = true
    this._update(e.detail)
  }
  _update(e) {
    if(!this._dragging) return
    const coord = InputEvents.getPoint(e)
    control.update(coord)
    control.anchor = num.shoveCoords
    num.updateWidth(control.deltaX)
    this.canvas.dispatchEvent(new CustomEvent('update', {
      bubbles: true,
      detail: num.props
    }))
  }
  _end(e) {
    if(!this._dragging) return
    this._dragging = false
    num.updateArea()
    this._update(e)
    control.anchor = num.shoveCoords
    control.reset()
    this.canvas.dispatchEvent(new CustomEvent('update', {
      bubbles: true,
      detail: num.props
    }))
  }
  _addEventListeners() {
    const events = InputEvents.EVENTS
    this._start = this._start.bind(this)
    this._update = this._update.bind(this)
    this._end = this._end.bind(this)

    document.body.addEventListener('start-drag', this._start)
    document.body.addEventListener(events.move, this._update)
    document.body.addEventListener(events.up, this._end)
    document.body.addEventListener(events.cancel, this._end)
  }
  constructor(
    board = 20,
    width = window.innerWidth,
    height = window.innerHeight
  ) {
    if(!grid) {
      grid = this
    }
    this.board = board
    this.size = Math.min(width, height * 2) / this.board
    this.hsize = this.size * 0.5
    this.qsize = this.size * 0.25
    this.zScale = 1
    this.zsize = this.zScale * this.hsize
    if(width > height) {
      this.origin = [width * 0.5 - board * this.hsize , height * 0.5]
      this.zMax = this.board * 0.9
    } else {
      this.origin = [width * 0.5 - board * this.hsize , height * 0.75]
      this.zMax = this.board * 2.4
    }

    this.width = width
    this.height = height
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')
    this._dragging = false
  
    this._addEventListeners()
    document.body.appendChild(this.canvas)
    return grid
  }
}
