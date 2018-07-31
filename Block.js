class Block {
  constructor({x = 0, y = 0, z = 0, l = 1, b = 1, h = 0, hue = 10, opacity = 1}) {
    this.x = x
    this.y = y
    this.z = z
    
    this.l = l // x
    this.b = b // y
    this.h = h // z
    
    this.hue = hue
    this.opacity = opacity
  }
  update({
    x = this.x, 
    y = this.y, 
    z = this.z, 
    l = this.l, 
    b = this.b, 
    h = this.h, 
    hue = this.hue, 
    opacity = this.opacity
  }) {
    this.x = x
    this.y = y
    this.z = z
    
    this.l = l // x
    this.b = b // y
    this.h = h // z
    
    this.hue = hue
    this.hue = opacity
  }
  get _strokeStyle() {
    return `hsla(${this.hue}, 100%, 20%, ${this.opacity})`
  }
  _drawTile(x, y, z) {
    grid.ctx.fillStyle = `hsla(${this.hue}, 75%, 50%, ${this.opacity})`
    grid.ctx.strokeStyle = this._strokeStyle
    grid.ctx.lineWidth = 1
    const [coordX, coordY] = grid.getCoord(x, y, z)
    grid.ctx.beginPath()
    grid.ctx.moveTo(coordX, coordY)
    grid.ctx.lineTo(coordX + grid.hsize, coordY - grid.qsize)
    grid.ctx.lineTo(coordX + grid.size, coordY)
    grid.ctx.lineTo(coordX + grid.hsize, coordY + grid.qsize)
    grid.ctx.closePath()
    grid.ctx.fill()
    grid.ctx.stroke()
  }
  _drawTop() {
    for(let x = this.x; x < this.x + this.l; x++) {
      for(let y = this.y; y < this.y + this.b; y++) {
        this._drawTile(x, y, this.z + this.h)
      }
    }  
  }
  _drawLeftWall(x, y, z) {
    grid.ctx.fillStyle = `hsla(${this.hue}, 75%, 65%, ${this.opacity})`
    grid.ctx.strokeStyle = this._strokeStyle
    grid.ctx.lineWidth = 1
    const [coordX, coordY] = grid.getCoord(x, y, z)
    grid.ctx.beginPath()
    grid.ctx.moveTo(coordX, coordY)
    grid.ctx.lineTo(coordX, coordY - grid.zsize)
    grid.ctx.lineTo(coordX + grid.hsize, coordY + grid.qsize - grid.zsize)
    grid.ctx.lineTo(coordX + grid.hsize, coordY + grid.qsize)
    grid.ctx.closePath()
    grid.ctx.fill()
    grid.ctx.stroke()
  }
  _drawLeft() {
    for(let z = this.z; z < this.z + this.h; z++) {
      for(let y = this.y; y < this.y + this.b; y++) {
        this._drawLeftWall(this.x, y, z)
      }
    }
  }
  _drawRightWall(x, y, z) {
    grid.ctx.fillStyle = `hsla(${this.hue}, 75%, 35%, ${this.opacity})`
    grid.ctx.strokeStyle = this._strokeStyle
    grid.ctx.lineWidth = 1
    const [coordX, coordY] = grid.getCoord(x, y, z)
    grid.ctx.beginPath()
    grid.ctx.moveTo(coordX + grid.hsize, coordY + grid.qsize)
    grid.ctx.lineTo(coordX + grid.hsize, coordY + grid.qsize - grid.zsize)
    grid.ctx.lineTo(coordX + grid.size, coordY - grid.zsize)
    grid.ctx.lineTo(coordX + grid.size, coordY)
    grid.ctx.closePath()
    grid.ctx.fill()
    grid.ctx.stroke()
  }
  _drawRight() {
    for(let z = this.z; z < this.z + this.h; z++) {
      for(let x = this.x; x < this.x + this.l; x++) {
        this._drawRightWall(x, this.y + this.b - 1, z)
      }
    }  
  }
  render() {
    if(this.h > 0) {
      this._drawLeft()
      this._drawRight() 
    }
    this._drawTop()
  }
}
