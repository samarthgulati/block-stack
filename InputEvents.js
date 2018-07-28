'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputEvents = function () {
    function InputEvents() {
        _classCallCheck(this, InputEvents);
    }

    _createClass(InputEvents, null, [{
        key: 'getPoint',
        value: function getPoint(e) {
            var coord = { x: null, y: null };
            if ('touches' in e) {
                coord.x = e.touches[0].clientX;
                coord.y = e.touches[0].clientY;
            } else {
                coord.x = e.clientX;
                coord.y = e.clientY;
            }
            return coord;
        }
    }, {
        key: 'EVENTS',
        get: function get() {
            if (window.PointerEvent) {
                return {
                    down: 'pointerdown',
                    move: 'pointermove',
                    up: 'pointerup',
                    cancel: 'pointercancel'
                };
            } else if ('ontouchstart' in window) {
                return {
                    down: 'touchstart',
                    move: 'touchmove',
                    up: 'touchend',
                    cancel: 'touchcancel'
                };
            } else {
                return {
                    down: 'mousedown',
                    move: 'mousemove',
                    up: 'mouseup',
                    cancel: 'mouseleave'
                };
            }
        }
    }]);

    return InputEvents;
}();