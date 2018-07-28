'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function () {
  _createClass(Control, [{
    key: 'update',
    value: function update(_ref) {
      var x = _ref.x,
          y = _ref.y;

      this._x = x - this._r;
      this._y = y - this._r;
      this._thumb.style.transform = 'translate(' + this._x + 'px, ' + this._y + 'px)';
    }
  }, {
    key: '_handleDown',
    value: function _handleDown(e) {
      e.preventDefault();
      this._thumb.dispatchEvent(new CustomEvent('start-drag', {
        bubbles: true,
        detail: e
      }));
    }
  }, {
    key: 'reset',
    value: function reset() {
      var _this = this;

      this._thumb.style.pointerEvents = 'none';
      var animation = this._thumb.animate([{
        transform: 'translate(' + this._x + 'px, ' + this._y + 'px)'
      }, {
        transform: 'translate(' + (this._anchor.x - this._r) + 'px, ' + (this._anchor.y - this._r) + 'px)'
      }], {
        duration: 300,
        easing: 'ease-in-out'
      });
      animation.onfinish = function (_) {
        _this._thumb.style.pointerEvents = 'all';
        _this.update(_this._anchor);
      };
    }
  }, {
    key: 'toggleVisibility',
    value: function toggleVisibility() {
      this._visible = !this._visible;
      if (this._visible) {
        this._thumb.style.opacity = 1;
      } else {
        this._thumb.style.opacity = 0;
      }
    }
  }, {
    key: '_addEventListeners',
    value: function _addEventListeners() {
      this._handleDown = this._handleDown.bind(this);
      var events = InputEvents.EVENTS;
      this._thumb.addEventListener(events.down, this._handleDown);
    }
  }, {
    key: 'deltaX',
    get: function get() {
      // (x1-x2), (y1 - y2)
      // projection A = atan(0.5)
      // (x1-x2) * cosA , (y1 - y2) * sinA 
      // Mag 
      // (((x1-x2) * cosA) ** 2 + ((y1 - y2) * sinA) ** 2) ** 0.5
      // div by side 
      // (((x1-x2) * cosA) ** 2 + ((y1 - y2) * sinA) ** 2) ** 0.5 / (0.5 * size * cosA)
      // 2 * ((x1-x2) ** 2 + ((y1 - y2) * tanA) ** 2) ** 0.5 / size
      var x = this._x - (this._anchor.x - this._r);
      var y = this._y - (this._anchor.y - this._r);
      var angle = 180 * Math.atan2(y, x) / Math.PI;
      var posA = -25;
      var negA = 150;
      var delta = 60;
      if (angle > posA - delta && angle < posA + delta) {
        return Math.round(2 * Math.pow(Math.pow(x, 2) + Math.pow(y * 0.5, 2), 0.5) / grid.size);
      } else if (angle > negA - delta && angle < negA + delta) {
        return -Math.round(2 * Math.pow(Math.pow(x, 2) + Math.pow(y * 0.5, 2), 0.5) / grid.size);
      } else {
        return 0;
      }
    }
  }, {
    key: 'anchor',
    set: function set(a) {
      this._anchor = a;
    }
  }]);

  function Control(svg) {
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 48;

    _classCallCheck(this, Control);

    this._anchor = {
      x: 0,
      y: 0
    };
    this._angle = Math.PI / 6;
    this._r = r;
    this._x = 0;
    this._y = 0;
    this._thumb = SVG.getCircle({
      cx: r,
      cy: r,
      r: r,
      stroke: 'none',
      fill: 'hsla(200, 85%, 50%, 0.5)'
    });
    this._visible = true;
    this.toggleVisibility();
    this._addEventListeners();
    svg.appendChild(this._thumb);
  }

  return Control;
}();