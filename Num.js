let num = null
class Num {
  get value() {
    return this._w * this._h
  }
  get shoveCoords() {
    return this._shove.edgeCoords
  }
  set _props(p) {
    this._x = p.x
    this._y = p.y
    this._w = p.w
    this._h = p.h
  }
  get props() {
    return {
      w: this._w,
      h: this._h
    }
  }
  get _props() {
    return {
      x: this._x,
      y: this._y,
      w: this._w,
      h: this._h
    }
  }
  updateArea() {
    if(this._w !== 1) {
      const val = this.value
      if(this._area > val) {
        this._w = Math.round(this._area / this._h)
        this._shove.update(this._props)
        this._block.l = this._w
      } else {
        this._area = val  
      }
    } else {
      this._block.l = 1
      this._block.h = this._area
      this._props = {
        x: this._x,
        y: this._y,
        w: 1,
        h: this._area
      }
      if(this.value > grid.zMax) {
        grid.zScale = grid.zMax / this.value
        grid.zsize = grid.zScale * grid.hsize
      }
      this._shove.update(this._props)
    }
  }
  updateWidth(w) {
    this._w += w
    this._w = Math.max(1, this._w)
    this._shove.update(this._props)
    this._block.l = this._w
  }
  render() {
    this._block.render()
  }
  constructor({x, y, w, h, hue}, id) {
    if(!num) {
      num = this
    }
    this.id = id
    this._x = x
    this._y = y
    this._w = w
    this._h = h
    this._hue = hue
    this._area = this.value
    this._block = new Block({
      x, y, l: w, b: h, h: 1, hue
    })
    // this._valueRect = new Block({
    //   x, y, l: w, b: h, h: 1, hue
    // })
    this._shove = new Shove({x, y, w, h})
    return num
  }
}
