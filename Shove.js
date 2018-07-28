'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shove = function () {
  _createClass(Shove, [{
    key: 'toggleVisibility',
    value: function toggleVisibility() {
      this._visible = !this._visible;
      if (this._visible) {
        this._group.style.opacity = 1;
      } else {
        this._group.style.opacity = 0;
      }
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var x = _ref.x,
          y = _ref.y,
          w = _ref.w,
          h = _ref.h;

      this._x = x;
      this._y = y;
      this._w = w;
      this._h = h;
      if (this._group) grid.updateShove(this._props, this._group);
    }
  }, {
    key: '_props',
    get: function get() {
      return {
        x: this._x,
        y: this._y,
        w: this._w,
        h: this._h
      };
    }
  }, {
    key: 'edgeCoords',
    get: function get() {
      var rod = this._group.lastElementChild;
      return {
        x: Number(rod.getAttribute('x2')),
        y: Number(rod.getAttribute('y2'))
      };
    }
  }]);

  function Shove(_ref2) {
    var x = _ref2.x,
        y = _ref2.y,
        w = _ref2.w,
        h = _ref2.h;

    _classCallCheck(this, Shove);

    this._visible = true;
    this.update({ x: x, y: y, w: w, h: h });
    this._group = grid.getShove(this._props);
    grid.svg.appendChild(this._group);
    this.toggleVisibility();
  }

  return Shove;
}();