const board = Math.min(
  Math.floor(
    Math.min(window.innerWidth, window.innerHeight) / 32
  ), 
  20
)
grid = new Isometric(board)
num = new Num({
  x: 0,
  y: board - 1,
  w: 1,
  h: 1,
  hue: 20
}, Date.now())
control = new Control()
const anchor = num.shoveCoords
control.anchor = anchor
control.update(anchor)

let base = null
let validExp = false
window.expEq.style.visibility = 'hidden'
window.exp.style.visibility = 'hidden'
grid.canvas.addEventListener('update', function(e) {
  const {w, h} = e.detail
  if(!base && h > 1) {
    base = h
    validExp = true
  }
  const value = w * h
  window.result.value = value
  window.add.value = Array(w).fill(h).join(' + ')
  window.mult.value = `${h} x ${w}`
  if(base) {
    const pow = Math.log(value) / Math.log(base)
    const truncPow = Math.trunc(pow)
    validExp = pow - truncPow < 1E-9
    if(validExp) {
      window.expEq.style.visibility = 'visible'
      window.exp.style.visibility = 'visible'
      window.exp.value = `${base} ^ ${Math.round(truncPow)}`
    } else {
      window.expEq.style.visibility = 'hidden'
      window.exp.style.visibility = 'hidden'
    } 
  }
})
function tick() {
  requestAnimationFrame(tick)
  grid.ctx.clearRect(0, 0, grid.width, grid.height)
  control.render()
  shove.render()
  num.render()
}
tick()