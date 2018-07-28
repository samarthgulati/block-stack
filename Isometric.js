'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Isometric = function () {
  _createClass(Isometric, [{
    key: 'addShove',
    value: function addShove(_ref, group) {
      var x = _ref.x,
          y = _ref.y,
          w = _ref.w,
          h = _ref.h;

      var xStart = x + w + 0.2;
      var hue = 200;
      var plate = this._getLeftWall(xStart, y, h, hue, true);
      plate.setAttribute('opacity', 0.75);
      var rod = document.createElementNS(SVG.NS, 'line');

      var _getCoord = this.getCoord(xStart, y + 0.5),
          _getCoord2 = _slicedToArray(_getCoord, 2),
          x1 = _getCoord2[0],
          y1 = _getCoord2[1];

      var _getCoord3 = this.getCoord(xStart + 1.5, y + 0.5),
          _getCoord4 = _slicedToArray(_getCoord3, 2),
          x2 = _getCoord4[0],
          y2 = _getCoord4[1];

      var y1z = y1 - h * (0.25 * this.size);
      var y2z = y2 - h * (0.25 * this.size);
      rod.setAttribute('x1', x1);
      rod.setAttribute('y1', y1z);
      rod.setAttribute('x2', x2);
      rod.setAttribute('y2', y2z);
      rod.setAttribute('stroke', 'hsla(' + hue + ', 100%, 30%, 0.75)');
      rod.setAttribute('stroke-width', 2);
      group.appendChild(plate);
      group.appendChild(rod);
      group.setAttribute('pointerEvents', 'none');
    }
  }, {
    key: 'getShove',
    value: function getShove(_ref2) {
      var x = _ref2.x,
          y = _ref2.y,
          w = _ref2.w,
          h = _ref2.h;

      var group = document.createElementNS(SVG.NS, 'g');
      this.addShove({ x: x, y: y, w: w, h: h }, group);
      return group;
    }
  }, {
    key: 'updateShove',
    value: function updateShove(_ref3, group) {
      var x = _ref3.x,
          y = _ref3.y,
          w = _ref3.w,
          h = _ref3.h;

      [].concat(_toConsumableArray(group.children)).forEach(function (c) {
        return group.removeChild(c);
      });
      this.addShove({ x: x, y: y, w: w, h: h }, group);
    }
  }, {
    key: 'getTile',
    value: function getTile(_ref4) {
      var x = _ref4.x,
          y = _ref4.y,
          _ref4$fill = _ref4.fill,
          fill = _ref4$fill === undefined ? 'none' : _ref4$fill,
          _ref4$stroke = _ref4.stroke,
          stroke = _ref4$stroke === undefined ? 'lightgrey' : _ref4$stroke;

      var tile = document.createElementNS(SVG.NS, 'polygon');
      tile.setAttribute('points', '\n        0,0 \n        ' + this.size * 0.5 + ',' + -this.size * 0.25 + ' \n        ' + this.size + ',0 \n        ' + this.size * 0.5 + ',' + this.size * 0.25);
      tile.setAttribute('fill', fill);
      tile.setAttribute('stroke', stroke);

      var _getCoord5 = this.getCoord(x, y),
          _getCoord6 = _slicedToArray(_getCoord5, 2),
          xCoord = _getCoord6[0],
          yCoord = _getCoord6[1];

      tile.style.transform = 'translate(' + xCoord + 'px,' + yCoord + 'px)';
      return tile;
    }
  }, {
    key: '_getLeftWall',
    value: function _getLeftWall(x, y, zMax, hue) {
      var selected = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var group = document.createElementNS(SVG.NS, 'g');
      for (var z = 0; z < zMax; z++) {
        var wall = document.createElementNS(SVG.NS, 'polygon');
        wall.setAttribute('points', '0,0 \n        0,' + -this.size * 0.5 + ' \n        ' + this.size * 0.5 + ',' + -this.size * 0.25 + '\n        ' + this.size * 0.5 + ',' + this.size * 0.25);
        var lDiff = selected ? 0 : 20;
        var fill = 'hsl(' + hue + ', 75%, ' + (65 + lDiff) + '%)';
        var stroke = 'hsl(' + hue + ', 100%, ' + (20 + lDiff) + '%)';
        wall.setAttribute('fill', fill);
        wall.setAttribute('stroke', stroke);

        var _getCoord7 = this.getCoord(x + z, y - z),
            _getCoord8 = _slicedToArray(_getCoord7, 2),
            xCoord = _getCoord8[0],
            yCoord = _getCoord8[1];

        wall.style.transform = 'translate(' + xCoord + 'px,' + yCoord + 'px)';
        group.appendChild(wall);
      }
      return group;
    }
  }, {
    key: '_getRightWall',
    value: function _getRightWall(x, y, zMax, hue) {
      var selected = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var group = document.createElementNS(SVG.NS, 'g');
      for (var z = 0; z < zMax; z++) {
        var wall = document.createElementNS(SVG.NS, 'polygon');
        wall.setAttribute('points', '\n        ' + this.size * 0.5 + ',' + this.size * 0.25 + ' \n        ' + this.size * 0.5 + ',' + -this.size * 0.25 + ' \n        ' + this.size + ',' + -this.size * 0.5 + '\n        ' + this.size + ',0');
        var lDiff = selected ? 0 : 20;
        var fill = 'hsl(' + hue + ', 75%, ' + (35 + lDiff) + '%)';
        var stroke = 'hsl(' + hue + ', 100%, ' + (20 + lDiff) + '%)';
        wall.setAttribute('fill', fill);
        wall.setAttribute('stroke', stroke);
        var coord = this.getCoord(x + z, y - z);
        wall.style.transform = 'translate(' + coord[0] + 'px,' + coord[1] + 'px)';
        group.appendChild(wall);
      }
      return group;
    }
  }, {
    key: '_getTop',
    value: function _getTop(x, y, z, hue) {
      var selected = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var tile = document.createElementNS(SVG.NS, 'polygon');
      tile.setAttribute('points', '0,0 \n      ' + this.size * 0.5 + ',' + -this.size * 0.25 + ' \n      ' + this.size + ',0 \n      ' + this.size * 0.5 + ',' + this.size * 0.25);
      var lDiff = selected ? 0 : 20;
      var fill = 'hsl(' + hue + ', 75%, ' + (50 + lDiff) + '%)';
      var stroke = 'hsl(' + hue + ', 100%, ' + (20 + lDiff) + '%)';
      tile.setAttribute('fill', fill);
      tile.setAttribute('stroke', stroke);
      var coord = this.getCoord(x, y);
      tile.style.transform = 'translate(' + coord[0] + 'px,' + (coord[1] - z * this.size * 0.5) + 'px)';
      return tile;
    }
  }, {
    key: 'getBlock',
    value: function getBlock(x, y, z) {
      var hue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var selected = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var group = document.createElementNS(SVG.NS, 'g');
      var lWall = this._getLeftWall(x, y, z, hue, selected);
      group.appendChild(lWall);
      var rWall = this._getRightWall(x, y, z, hue, selected);
      group.appendChild(rWall);
      var top = this._getTop(x, y, z, hue, selected);
      group.appendChild(top);
      return group;
    }
  }, {
    key: 'addBlocks',
    value: function addBlocks(_ref5, group) {
      var x = _ref5.x,
          y = _ref5.y,
          w = _ref5.w,
          h = _ref5.h,
          hue = _ref5.hue,
          selected = _ref5.selected;

      for (var n = w - 1; n >= 0; n--) {
        var block = this.getBlock(x + n, y, h, hue, selected);
        group.appendChild(block);
      }
    }
  }, {
    key: 'updateBlocks',
    value: function updateBlocks(_ref6, group) {
      var x = _ref6.x,
          y = _ref6.y,
          w = _ref6.w,
          h = _ref6.h,
          hue = _ref6.hue,
          selected = _ref6.selected;

      [].concat(_toConsumableArray(group.children)).forEach(function (c) {
        return group.removeChild(c);
      });
      this.addBlocks({ x: x, y: y, w: w, h: h, hue: hue, selected: selected }, group);
    }
  }, {
    key: 'getBlocks',
    value: function getBlocks(_ref7) {
      var x = _ref7.x,
          y = _ref7.y,
          w = _ref7.w,
          h = _ref7.h,
          hue = _ref7.hue,
          selected = _ref7.selected;

      var group = document.createElementNS(SVG.NS, 'g');
      this.addBlocks({ x: x, y: y, w: w, h: h, hue: hue, selected: selected }, group);
      return group;
    }
  }, {
    key: 'getCoord',
    value: function getCoord(x, y) {
      return [this._origin[0] + (x + y) * this.size * 0.5, this._origin[1] + (y - x) * this.size * 0.25];
    }
  }, {
    key: '_drawGrid',
    value: function _drawGrid() {
      var _this = this;

      this._grid = document.createElementNS(SVG.NS, 'g');
      [].concat(_toConsumableArray(Array(this.board))).forEach(function (b, x) {
        [].concat(_toConsumableArray(Array(_this.board))).forEach(function (b, y) {
          var tile = _this.getTile({ x: x, y: y });
          _this._grid.appendChild(tile);
        });
      });
      this.svg.appendChild(this._grid);
    }
  }, {
    key: '_start',
    value: function _start(e) {
      if (this._dragging) return;
      this._dragging = true;
      this._update(e.detail);
    }
  }, {
    key: '_update',
    value: function _update(e) {
      if (!this._dragging) return;
      this._control.update(InputEvents.getPoint(e));
      this._control.anchor = nums[this._selectedNum].shoveCoords;
      nums[this._selectedNum].updateWidth(this._control.deltaX);
    }
  }, {
    key: '_end',
    value: function _end(e) {
      if (!this._dragging) return;
      this._dragging = false;
      nums[this._selectedNum].updateArea();
      this._update(e);
      this._control.anchor = nums[this._selectedNum].shoveCoords;
      this._control.reset();
    }
  }, {
    key: '_deselect',
    value: function _deselect() {
      if (this._selectedNum) {
        nums[this._selectedNum].toggleSelect();
        this._control.toggleVisibility();
        this._selectedNum = null;
      }
    }
  }, {
    key: '_handleSelect',
    value: function _handleSelect(e) {
      var id = e.detail;
      if (this._selectedNum === id) {
        this._selectedNum = null;
        this._dragging = false;
      } else {
        this._selectedNum = id;
        var anchor = nums[id].shoveCoords;
        this._control.anchor = anchor;
        this._control.update(anchor);
      }
      this._control.toggleVisibility();
    }
  }, {
    key: '_addEventListeners',
    value: function _addEventListeners() {
      var events = InputEvents.EVENTS;
      this._start = this._start.bind(this);
      this._update = this._update.bind(this);
      this._end = this._end.bind(this);
      this._deselect = this._deselect.bind(this);
      this._handleSelect = this._handleSelect.bind(this);
      this.svg.addEventListener('start-drag', this._start);
      this.svg.addEventListener(events.move, this._update);
      this.svg.addEventListener(events.up, this._end);
      this.svg.addEventListener(events.cancel, this._end);
      // this.svg.addEventListener(events.down, this._deselect)
      this.svg.addEventListener('toggle-select', this._handleSelect);
    }
  }]);

  function Isometric() {
    var board = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.innerWidth;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.innerHeight;

    _classCallCheck(this, Isometric);

    this._selectedNum = null;
    this._dragging = false;
    this.board = board;
    this.size = Math.min(width / board, 2 * height / board);
    this._origin = [width * 0.5 - board * 0.5 * this.size, height * 0.5];
    this.svg = document.createElementNS(SVG.NS, "svg");
    this.svg.setAttribute("viewBox", '0 0 ' + width + ' ' + height);
    this.svg.setAttribute("width", width + 'px');
    this.svg.setAttribute("height", height + 'px');
    document.body.appendChild(this.svg);
    this._control = new Control(this.svg, 0.35 * this.size);
    this._addEventListeners();
    this._drawGrid();
  }

  return Isometric;
}();