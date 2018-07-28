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
  get _props() {
    return {
      x: this._x,
      y: this._y,
      w: this._w,
      h: this._h
    }
  }
  get _gridProps() {
    return {
      x: this._x * grid.size,
      y: this._y * grid.size,
      w: this._w * grid.size,
      h: this._h * grid.size,
      stroke: 'none',
      fill: this._selected ? `hsl(${this._hue}, 85%, 50%)` : `hsl(${this._hue}, 85%, 70%)`
    }
  }
  get _valueGridProps() {
    return {
      x: this._x * grid.size,
      y: this._y * grid.size,
      w: grid.size,
      h: this._area * grid.size,
      stroke: 'none',
      fill: this._selected ? `hsl(${this._hue}, 85%, 50%)` : `hsl(${this._hue}, 85%, 70%)`
    }
  }
  updateArea() {
    if(this._w !== 1) {
      const val = this.value
      if(this._area > val) {
        this._rect.style.pointerEvents = 'all'
        const animation = this._rect.animate([{
          transform: `scaleX(1)`
        },{
          transform: `scaleX(${(this._area / this._h)/this._w})`
        }], {
          duration: 300,
          easing: 'ease-in-out'
        })
        this._w = Math.round(this._area / this._h)
        this._shove.update(this._props)
        animation.onfinish = _ => {
          this._rect.style.pointerEvents = 'all'
          SVG.updateRect(this._gridProps, this._rect)
        }
      } else {
        this._area = val  
      }
    } else {
      SVG.updateRect(this._valueGridProps, this._valueRect)
      this._props = {
        x: this._x,
        y: this._y,
        w: 1,
        h: this._area
      }
      this._shove.update(this._props)
      SVG.updateRect(this._gridProps, this._rect)
    }
  }
  updateWidth(w) {
    this._w += w
    this._w = Math.max(1, this._w)
    this._shove.update(this._props)
    SVG.updateRect(this._gridProps, this._rect)
  }
  toggleSelect(e) {
    e.preventDefault()
    this._selected = !this._selected
    this._shove.toggleVisibility()
    SVG.updateRect(this._gridProps, this._rect)
    this._rect.dispatchEvent(new CustomEvent('toggle-select', {
      bubbles: true,
      detail: this.id
    }))
  }
  _addEventListeners() {
    this.toggleSelect = this.toggleSelect.bind(this)
    this._rect.addEventListener('click', this.toggleSelect)
  }
  constructor({x, y, w, h, hue}, id) {
    this.id = id
    this._x = x
    this._y = y
    this._w = w
    this._h = h
    this._hue = hue
    this._selected = false
    this._area = this.value
    this._rect = SVG.getRect(this._gridProps)
    this._valueRect = SVG.getRect(this._valueGridProps)
    this._shove = new Shove({x, y, w, h})
    this._addEventListeners()
    grid.svg.appendChild(this._valueRect)
    grid.svg.appendChild(this._rect)
  }
}
