class InputEvents {
  static get EVENTS() {
      if (window.PointerEvent) {
          return {
              down: 'pointerdown',
              move: 'pointermove',
              up: 'pointerup',
              cancel: 'pointercancel'
          }
      } else if ('ontouchstart' in window) {
          return {
              down: 'touchstart',
              move: 'touchmove',
              up: 'touchend',
              cancel: 'touchcancel'
          }
      } else {
          return {
              down: 'mousedown',
              move: 'mousemove',
              up: 'mouseup',
              cancel: 'mouseleave'
          }
      }
  }
  static getPoint(e) {
    const coord = {x: null , y: null}
    if ('touches' in e) {
        coord.x = e.touches[0].clientX
        coord.y = e.touches[0].clientY
    } else {
        coord.x = e.clientX 
        coord.y = e.clientY
    }
    return coord
  }        
    
}