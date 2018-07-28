class Isometric {
  addShove({x, y, w, h}, group) {
    const xStart = x + w + 0.2
    const hue = 200
    const plate = this._getLeftWall(xStart, y, h, hue, true)
    plate.setAttribute('opacity', 0.75)
    const rod = document.createElementNS(SVG.NS, 'line')
    const [x1, y1] = this.getCoord(xStart, y + 0.5)
    const [x2, y2] = this.getCoord(xStart + 1.5, y + 0.5)
    const y1z = y1 - h * (0.25 * this.size)
    const y2z = y2 - h * (0.25 * this.size)
    rod.setAttribute('x1', x1)
    rod.setAttribute('y1', y1z)
    rod.setAttribute('x2', x2)
    rod.setAttribute('y2', y2z)
    rod.setAttribute('stroke', `hsla(${hue}, 100%, 30%, 0.75)`)
    rod.setAttribute('stroke-width', 2)
    group.appendChild(plate)
    group.appendChild(rod)
    group.setAttribute('pointerEvents', 'none')
  }
  getShove({x, y, w, h}) {
    const group = document.createElementNS(SVG.NS, 'g')
    this.addShove({x, y, w, h}, group)
    return group
  }

  updateShove({x, y, w, h}, group) {
    [...group.children].forEach(c => group.removeChild(c))
    this.addShove({x, y, w, h}, group)
  }

  getTile({x, y, fill='none', stroke='lightgrey'}) {
    const tile = document.createElementNS(SVG.NS, 'polygon')
    tile.setAttribute('points', `
        0,0 
        ${this.size * 0.5},${-this.size * 0.25} 
        ${this.size},0 
        ${this.size * 0.5},${this.size * 0.25}`
    )
    tile.setAttribute('fill', fill)
    tile.setAttribute('stroke', stroke)
    const [xCoord, yCoord] = this.getCoord(x, y)
    tile.style.transform = `translate(${xCoord}px,${yCoord}px)`
    return tile
  }
  
  _getLeftWall(x, y, zMax, hue, selected = false) {
    const group = document.createElementNS(SVG.NS, 'g')
    for(let z = 0; z < zMax; z++) {
      const wall = document.createElementNS(SVG.NS, 'polygon')
      wall.setAttribute('points', `0,0 
        0,${-this.size*0.5} 
        ${this.size*0.5},${-this.size*0.25}
        ${this.size*0.5},${this.size*0.25}`)
      const lDiff = selected ? 0 : 20
      const fill = `hsl(${hue}, 75%, ${65 + lDiff}%)`
      const stroke = `hsl(${hue}, 100%, ${20 + lDiff}%)`
      wall.setAttribute('fill', fill)
      wall.setAttribute('stroke', stroke)
      const [xCoord, yCoord] = this.getCoord(x + z, y - z)
      wall.style.transform = `translate(${xCoord}px,${yCoord}px)`
      group.appendChild(wall) 
    }
    return group
  }

  _getRightWall(x, y, zMax, hue, selected = false) {
    const group = document.createElementNS(SVG.NS, 'g')
    for(let z = 0; z < zMax; z++) {
      const wall = document.createElementNS(SVG.NS, 'polygon')
      wall.setAttribute('points', `
        ${this.size*0.5},${this.size*0.25} 
        ${this.size*0.5},${-this.size*0.25} 
        ${this.size},${-this.size*0.5}
        ${this.size},0`)
      const lDiff = selected ? 0 : 20
      const fill = `hsl(${hue}, 75%, ${35 + lDiff}%)`
      const stroke = `hsl(${hue}, 100%, ${20 + lDiff}%)`
      wall.setAttribute('fill', fill)
      wall.setAttribute('stroke', stroke)
      const coord = this.getCoord(x + z, y - z)
      wall.style.transform = `translate(${coord[0]}px,${coord[1]}px)`
      group.appendChild(wall)
    }
    return group
  }

  _getTop(x, y, z, hue, selected = false) {
    const tile = document.createElementNS(SVG.NS, 'polygon')
    tile.setAttribute('points', `0,0 
      ${this.size * 0.5},${-this.size * 0.25} 
      ${this.size},0 
      ${this.size * 0.5},${this.size * 0.25}`)
    const lDiff = selected ? 0 : 20
    const fill = `hsl(${hue}, 75%, ${50 + lDiff}%)`
    const stroke = `hsl(${hue}, 100%, ${20 + lDiff}%)`
    tile.setAttribute('fill', fill)
    tile.setAttribute('stroke', stroke)
    const coord = this.getCoord(x, y)
    tile.style.transform = `translate(${coord[0]}px,${coord[1]-z*this.size*0.5}px)`
    return tile
  }

  getBlock(x, y, z, hue = 0, selected = false) {
    const group = document.createElementNS(SVG.NS, 'g')
    const lWall = this._getLeftWall(x, y, z, hue, selected)
    group.appendChild(lWall)
    const rWall = this._getRightWall(x, y, z, hue, selected)
    group.appendChild(rWall)
    const top = this._getTop(x, y, z, hue, selected)
    group.appendChild(top)
    return group
  }
  addBlocks({x, y, w, h, hue, selected}, group) {
    for(let n = w - 1; n >= 0; n--) {
      const block = this.getBlock(x + n, y, h, hue, selected)
      group.appendChild(block)
    }
  }
  updateBlocks({x, y, w, h, hue, selected}, group) {
    [...group.children].forEach(c => group.removeChild(c))
    this.addBlocks({x, y, w, h, hue, selected}, group)
  }
  getBlocks({x, y, w, h, hue, selected}) {
    const group = document.createElementNS(SVG.NS, 'g')
    this.addBlocks({x, y, w, h, hue, selected}, group)
    return group
  }
  getCoord(x,y) {
    return [
      this._origin[0] + (x + y) * this.size * 0.5, 
      this._origin[1] + (y - x) * this.size * 0.25
    ]
  }
  _drawGrid() {
    this._grid = document.createElementNS(SVG.NS, 'g');
    [...Array(this.board)].forEach((b,x) => {
      [...Array(this.board)].forEach((b,y) => {
        const tile = this.getTile({x, y})
        this._grid.appendChild(tile)
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
    nums[this._selectedNum].updateWidth(this._control.deltaX)
  }
  _end(e) {
    if(!this._dragging) return
    this._dragging = false
    nums[this._selectedNum].updateArea()
    this._update(e)
    this._control.anchor = nums[this._selectedNum].shoveCoords
    this._control.reset()
  }
  _deselect() {
    if(this._selectedNum) {
      nums[this._selectedNum].toggleSelect()
      this._control.toggleVisibility()
      this._selectedNum = null
    }
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
  _addEventListeners() {
    const events = InputEvents.EVENTS
    this._start = this._start.bind(this)
    this._update = this._update.bind(this)
    this._end = this._end.bind(this)
    this._deselect = this._deselect.bind(this)
    this._handleSelect = this._handleSelect.bind(this)
    this.svg.addEventListener('start-drag', this._start)
    this.svg.addEventListener(events.move, this._update)
    this.svg.addEventListener(events.up, this._end)
    this.svg.addEventListener(events.cancel, this._end)
    // this.svg.addEventListener(events.down, this._deselect)
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
    this.size = Math.min(width / board, 2 * height / board)
    this._origin = [width * 0.5 - board * 0.5 * this.size , height * 0.5]
    this.svg = document.createElementNS(SVG.NS, "svg")
    this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
    this.svg.setAttribute("width", `${width}px`)
    this.svg.setAttribute("height", `${height}px`)
    document.body.appendChild(this.svg)
    this._control = new Control(this.svg, 0.35 * this.size)
    this._addEventListeners()
    this._drawGrid()
  }
}