const board = Math.min(
  Math.floor(
    Math.min(window.innerWidth, window.innerHeight) / 32
  ), 
  20
)
grid = new Isometric(board)
const initProps = {
  x: 0,
  y: board - 1,
  w: 1,
  h: 1,
  hue: 20
}
num = new Num(initProps, Date.now())
control = new Control()
const anchor = num.shoveCoords
control.anchor = anchor
control.update(anchor)

let base = null
let validExp = false
window.expEq.style.visibility = 'hidden'
window.exp.style.visibility = 'hidden'
let state = -1
function updateNote() {
  let info = ''
  state++
  switch(state) {
    case 0:
      info = `What is a number?`
      window.next.textContent = 'Next ›'
      window.note.classList.remove('hidden')
      window.overlay.classList.remove('hidden')
      window.note.parentElement.classList.remove('done')
      break
    case 1:
      info = `Let us see if we can figure it out together...`
      break
    case 2:
      info = `Go ahead and pull the circle away from the box.`
      window.next.classList.add('hidden')
      window.overlay.classList.add('hidden')
      break
    case 3:
      info = `As we generate more of the same boxes, the count increases.`
      break
    case 4:
      info = `So, now there are ${window.result.value} boxes.`
      window.next.classList.remove('hidden')
      window.overlay.classList.remove('hidden')
      break
    case 5:
      info = `A number, therefore, is nothing but a symbol used to express how many things are being referred to, or how much there is of some thing (OED).`
      break
    case 6:
      info = `${window.result.value} is a symbol denoting the amount of some thing (here boxes).`
      break
    case 7:
      info = `We can also say, ${window.result.value} is same as: \n ${window.add.value}`
      break
    case 8:
      info = `Addition is just repeatedly adding 1, till there are no more of that same thing left.`
      break
    case 9:
      info = `Now, try pushing the circle towards the box.`
      window.next.classList.add('hidden')
      window.overlay.classList.add('hidden')
      break
    case 10:
      info = `As you let go of the circle, the number of boxes reduce.`
      break
    case 11:
      info = `Pushing removes boxes, and pulling puts more of them in there.`
      window.next.classList.remove('hidden')
      window.overlay.classList.remove('hidden')
      break
    case 12:
      info = `See what happens if you push the circle all the way to the first box in one go.`
      window.next.classList.add('hidden')
      window.overlay.classList.add('hidden')
      break
    case 13:
      info = `We just stacked all the boxes in a vertical tower as a group of ${window.result.value} boxes.`
      window.next.classList.remove('hidden')
      window.overlay.classList.remove('hidden')
      state++
      break
    case 15:
      info = `Now, try pulling the circle again.`
      window.next.classList.add('hidden')
      window.overlay.classList.add('hidden')
      break
    case 16:
      info = `This time it puts more of the same group. So, instead of counting one box at a time, it is now counting each group at a time.`
      window.next.classList.remove('hidden')
      window.overlay.classList.remove('hidden')
      break
    case 17:
      info = `And this is what multiplication is, repeated addition of a fixed number:\n ${window.add.value} \n = ${window.mult.value}`
      break
    case 18:
      info = `Try having the same amount of groups as there were boxes initially before the tower was formed.`
      window.next.classList.add('hidden')
      window.overlay.classList.add('hidden')
      break
    case 19:
      info = `By adding the group same amount of times as the original number in the group we get an exponent:\n ${window.exp.value}`
      window.next.classList.remove('hidden')
      window.overlay.classList.remove('hidden')
      break
    case 20:
      info = `Exponent of 2 is a special case where the structure has same width, and height, thereby also called square.`
      break
    case 21:
      info = `Now, just like last time, push the circle all the way to first tower.`
      window.next.classList.add('hidden')
      window.overlay.classList.add('hidden')
      break
    case 22:
      const n = window.exp.value.split(' ^ ')[0]
      info = `The number of boxes in the tower becomes the solution to the last multiplication:\n ${n} x ${n} = ${window.result.value}`
      window.next.classList.remove('hidden')
      window.overlay.classList.remove('hidden')
      break
    case 23:
      info = `Try repeating the last sequence of steps, to get same amount of this new group as the original number.`
      window.next.classList.add('hidden')
      window.overlay.classList.add('hidden')
      break
    case 24:
      const [base, exp] = window.exp.value.split(' ^ ')
      info = `This just extended the exponent to ${exp}, which is the repeat multiplication of the original number:\n ${Array(Number(exp)).fill(Number(base)).join(' x ')} \n = ${window.exp.value}`
      window.next.classList.remove('hidden')
      window.overlay.classList.remove('hidden')
      break
    case 25: 
      info = `Go ahead and continue exploring, or reset to start with 1 box.`
      window.next.textContent = 'Reset'
      window.overlay.classList.add('hidden')
      break
    default:
      grid.reset()
      num.reset(initProps)
      shove.update(initProps)
      const anchor = num.shoveCoords
      control.anchor = anchor
      control.update(anchor)
      window.help.textContent = 'Show Intro'
      window.next.classList.remove('hidden')
      window.next.textContent = 'Reset'
      window.overlay.classList.add('hidden')
      window.note.classList.add('hidden')
      window.note.parentElement.classList.add('done')
      window.result.value = 1
      window.add.value = 1
      window.mult.value = 1
      window.exp.value = 1
      window.expEq.style.visibility = 'hidden'
      window.exp.style.visibility = 'hidden'
      break
  }
  window.note.textContent = info
}

function updateView(e) {
  const {w, h} = e.detail
  if(!base && h > 1) {
    base = h
    validExp = true
  }
  const value = w * h
  window.result.value = value
  window.add.value = Array(w).fill(h).join(' + ')
  window.mult.value = `${h} x ${w}`
  let truncPow
  if(base) {
    const pow = Math.log(value) / Math.log(base)
    truncPow = Math.trunc(pow)
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
  if(e.type === 'update') {
    if(state === 2 
      || state === 9) {
      updateNote()
    }
  } else if(e.type === 'end') {
    if(state === 3 
    || state === 10
    || (state === 12 && w === 1) 
    || state === 15
    || (state === 18 && truncPow !== undefined && validExp)
    || state === 21 && w === 1
    || (state === 23 && truncPow !== undefined && validExp)
    ) {
      updateNote()
    }
  }
}

function handleHelpClick() {
  if(state <= 25) {
    state = 25
    updateNote()
    window.help.textContent = 'Show Intro'
  } else {
    updateNote()
    state = -1
    window.help.textContent = 'Skip Intro »'
    updateNote()
  }
}


document.body.addEventListener('update', updateView)
document.body.addEventListener('end', updateView)
window.next.addEventListener('click', updateNote)
window.help.addEventListener('click', handleHelpClick)
function tick() {
  requestAnimationFrame(tick)
  grid.ctx.clearRect(0, 0, grid.width, grid.height)
  control.render()
  shove.render()
  num.render()
}
updateNote()
tick()