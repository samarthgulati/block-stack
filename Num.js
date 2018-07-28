'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Num = function () {
  _createClass(Num, [{
    key: 'updateArea',
    value: function updateArea() {
      if (this._w !== 1) {
        var val = this.value;
        if (this._area > val) {
          this._w = Math.round(this._area / this._h);
          this._shove.update(this._props);
          grid.updateBlocks(this._gridProps, this._rect);
        } else {
          this._area = val;
        }
      } else {
        grid.updateBlocks(this._valueGridProps, this._valueRect);
        this._props = {
          x: this._x,
          y: this._y,
          w: 1,
          h: this._area
        };
        this._shove.update(this._props);
        grid.updateBlocks(this._gridProps, this._rect);
      }
    }
  }, {
    key: 'updateWidth',
    value: function updateWidth(w) {
      this._w += w;
      this._w = Math.max(1, this._w);
      this._shove.update(this._props);
      grid.updateBlocks(this._gridProps, this._rect);
    }
  }, {
    key: 'toggleSelect',
    value: function toggleSelect(e) {
      e.preventDefault();
      this._selected = !this._selected;
      this._shove.toggleVisibility();
      grid.updateBlocks(this._gridProps, this._rect);
      this._rect.dispatchEvent(new CustomEvent('toggle-select', {
        bubbles: true,
        detail: this.id
      }));
    }
  }, {
    key: '_addEventListeners',
    value: function _addEventListeners() {
      this.toggleSelect = this.toggleSelect.bind(this);
      this._rect.addEventListener('click', this.toggleSelect);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._w * this._h;
    }
  }, {
    key: 'shoveCoords',
    get: function get() {
      return this._shove.edgeCoords;
    }
  }, {
    key: '_props',
    set: function set(p) {
      this._x = p.x;
      this._y = p.y;
      this._w = p.w;
      this._h = p.h;
    },
    get: function get() {
      return {
        x: this._x,
        y: this._y,
        w: this._w,
        h: this._h
      };
    }
  }, {
    key: '_gridProps',
    get: function get() {
      return _extends({
        hue: this._hue,
        selected: this._selected
      }, this._props);
    }
  }, {
    key: '_valueGridProps',
    get: function get() {
      return _extends({
        w: 1,
        h: this._area
      }, this._gridProps);
    }
  }]);

  function Num(_ref, id) {
    var x = _ref.x,
        y = _ref.y,
        w = _ref.w,
        h = _ref.h,
        hue = _ref.hue;

    _classCallCheck(this, Num);

    this.id = id;
    this._x = x;
    this._y = y;
    this._w = w;
    this._h = h;
    this._hue = hue;
    this._selected = false;
    this._area = this.value;
    this._rect = grid.getBlocks(this._gridProps);
    this._valueRect = grid.getBlocks(this._valueGridProps);
    this._shove = new Shove({ x: x, y: y, w: w, h: h });
    this._addEventListeners();
    grid.svg.appendChild(this._valueRect);
    grid.svg.appendChild(this._rect);
  }

  return Num;
}();