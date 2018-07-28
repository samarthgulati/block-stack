'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SVG = function () {
  function SVG() {
    _classCallCheck(this, SVG);
  }

  _createClass(SVG, null, [{
    key: 'updateRect',
    value: function updateRect(_ref, rect) {
      var x = _ref.x,
          y = _ref.y,
          w = _ref.w,
          h = _ref.h,
          stroke = _ref.stroke,
          fill = _ref.fill;

      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', w);
      rect.setAttribute('height', h);
      rect.setAttribute('stroke', stroke);
      rect.setAttribute('fill', fill);
    }
  }, {
    key: 'getRect',
    value: function getRect(_ref2) {
      var x = _ref2.x,
          y = _ref2.y,
          w = _ref2.w,
          h = _ref2.h,
          stroke = _ref2.stroke,
          fill = _ref2.fill;

      var rect = document.createElementNS(SVG.NS, 'rect');
      SVG.updateRect({ x: x, y: y, w: w, h: h, stroke: stroke, fill: fill }, rect);
      return rect;
    }
  }, {
    key: 'updateCircle',
    value: function updateCircle(_ref3, circle) {
      var cx = _ref3.cx,
          cy = _ref3.cy,
          r = _ref3.r,
          stroke = _ref3.stroke,
          fill = _ref3.fill;

      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', r);
      circle.setAttribute('stroke', stroke);
      circle.setAttribute('fill', fill);
    }
  }, {
    key: 'getCircle',
    value: function getCircle(_ref4) {
      var cx = _ref4.cx,
          cy = _ref4.cy,
          r = _ref4.r,
          stroke = _ref4.stroke,
          fill = _ref4.fill;

      var circle = document.createElementNS(SVG.NS, 'circle');
      SVG.updateCircle({ cx: cx, cy: cy, r: r, stroke: stroke, fill: fill }, circle);
      return circle;
    }
  }, {
    key: 'NS',
    get: function get() {
      return 'http://www.w3.org/2000/svg';
    }
  }]);

  return SVG;
}();