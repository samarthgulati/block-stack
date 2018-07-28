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
    const rod = this._group.lastElementChild
    return {
      x: Number(rod.getAttribute('x2')),
      y: Number(rod.getAttribute('y2'))
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
      grid.updateShove(this._props, this._group)
  }
  constructor({x, y, w, h}) {
    this._visible = true
    this.update({x, y, w, h})
    this._group = grid.getShove(this._props)
    grid.svg.appendChild(this._group)
    this.toggleVisibility()
  }
}