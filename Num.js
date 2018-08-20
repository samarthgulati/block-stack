let num = null
class Num {
  get value() {
    return this._w * this._h
  }
  get shoveCoords() {
    return shove.edgeCoords
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
      if(this._savedValue > val) {
        this._valueBlock.h = this._block.h
      }
      this._savedValue = val
    } else {
      this._block.l = 1
      this._block.h = this._savedValue
      this._base = this._savedValue
      this._valueBlock.l = 1
      this._valueBlock.h = this._savedValue
      this._props = {
        x: this._x,
        y: this._y,
        w: 1,
        h: this._savedValue
      }
      if(this.value > grid.zMax) {
        grid.zScale = grid.zMax / this.value
        grid.zsize = grid.zScale * grid.hsize
      }
      shove.update(this._props)
    }
  }
  updateWidth(w) {
    this._w += w
    this._w = Math.max(1, this._w)
    shove.update(this._props)
    this._block.l = this._w
    this._valueBlock.h = Math.max(this._base, this._base + this._savedValue - this.value)
  }
  render() {
    this._block.render()
    this._valueBlock.render()
  }
  reset(props) {
    this._props = props
    props = {
      l: props.w,
      ...props
    }
    this._block.update(props)
    this._valueBlock.update(props)
    this._hue = props.hue
    this._savedValue = this.value
    this._base = this._savedValue
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
    this._savedValue = this.value
    this._base = this._savedValue
    this._block = new Block({
      x, y, l: w, b: h, h: 1, hue
    })
    this._valueBlock = new Block({
      x, y, l: w, b: h, h: 1, hue, opacity: 0.75
    })
    shove = new Shove({x, y, w, h})
    return num
  }
}
