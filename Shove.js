class Shove {
  get _props() {
    return {
      x: ((this._x + this._w) * grid.size) + grid.size * 0.2,
      y: this._y * grid.size,
      w: this._w * grid.size,
      h: this._h * grid.size
    }
  }
  get edgeCoords() {
    const {x, y, h} = this._props
    return {
      x: x + grid.size,
      y: y + (h * 0.5)
    }
  }
  toggleVisibility() {
    this._visible = !this._visible
    if(this._visible) {
      this._group.style.opacity = 1
    } else {
      this._group.style.opacity = 0
    }
  }
  update({x, y, w, h}) {
    this._x = x
    this._y = y
    this._w = w
    this._h = h
    if(this._group)
      Cartesian.updateShove(this._props, this._group)
  }
  constructor({x, y, w, h}) {
    this._visible = false
    this.update({x, y, w, h})
    this._group = Cartesian.getShove(this._props)
    grid.svg.appendChild(this._group)
  }
}