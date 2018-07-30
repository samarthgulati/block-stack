let shove = null
class Shove {
  get _props() {
    return {
      x: this._x,
      y: this._y,
      w: this._w,
      h: this._h
    }
  }
  get edgeCoords() {
    const [coordX, coordY] = grid.getCoord(this._x + this._w + 0.2, this._y)
    return {
      x: coordX + grid.size,
      y: coordY - grid.hsize
    }
  }
  render() {
    const {x, y, w, h} = this._props
    
    grid.ctx.fillStyle = `hsl(200, 75%, 65%)`
    grid.ctx.strokeStyle = `hsl(200, 75%, 45%)`
    grid.ctx.lineWidth = 1
    const [coordX, coordY] = grid.getCoord(x + w + 0.2, y)
    grid.ctx.beginPath()
    grid.ctx.moveTo(coordX, coordY)
    grid.ctx.lineTo(coordX, coordY - h * grid.zsize)
    grid.ctx.lineTo(coordX + grid.hsize, coordY + grid.qsize - h * grid.zsize)
    grid.ctx.lineTo(coordX + grid.hsize, coordY + grid.qsize)
    grid.ctx.closePath()
    grid.ctx.fill()
    grid.ctx.stroke()

    grid.ctx.beginPath()
    grid.ctx.moveTo(coordX + grid.qsize, coordY - 0.5 * grid.qsize)
    grid.ctx.lineTo(coordX + grid.size, coordY - grid.hsize)
    grid.ctx.closePath()
    grid.ctx.stroke()
  }
  update({x = this._x, y = this._y, w = this._w, h = this._h}) {
    this._x = x
    this._y = y
    this._w = w
    this._h = h
  }
  constructor({x, y, w, h}) {
    if(!shove) {
      shove = this
    }
    this._edgeCoords = {
      x: 0,
      y: 0
    }
    this.update({x, y, w, h})
    return shove
  }
}
