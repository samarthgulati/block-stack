"use strict";var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var num=null,Num=function(){function a(_ref,g){var b=_ref.x,c=_ref.y,d=_ref.w,e=_ref.h,f=_ref.hue;return _classCallCheck(this,a),num||(num=this),this.id=g,this._x=b,this._y=c,this._w=d,this._h=e,this._hue=f,this._savedValue=this.value,this._base=this._savedValue,this._block=new Block({x:b,y:c,l:d,b:e,h:1,hue:f}),this._valueBlock=new Block({x:b,y:c,l:d,b:e,h:1,hue:f,opacity:0.5}),shove=new Shove({x:b,y:c,w:d,h:e}),num}return _createClass(a,[{key:"updateArea",value:function updateArea(){if(1!==this._w){var b=this.value;this._savedValue>b&&(this._valueBlock.h=this._block.h),this._savedValue=b}else this._block.l=1,this._block.h=this._savedValue,this._base=this._savedValue,this._valueBlock.l=1,this._valueBlock.h=this._savedValue,this._props={x:this._x,y:this._y,w:1,h:this._savedValue},this.value>grid.zMax&&(grid.zScale=grid.zMax/this.value,grid.zsize=grid.zScale*grid.hsize),shove.update(this._props)}},{key:"updateWidth",value:function updateWidth(b){this._w+=b,this._w=Math.max(1,this._w),shove.update(this._props),this._block.l=this._w,this._valueBlock.h=Math.max(this._base,this._base+this._savedValue-this.value)}},{key:"render",value:function render(){this._block.render(),this._valueBlock.render()}},{key:"value",get:function get(){return this._w*this._h}},{key:"shoveCoords",get:function get(){return shove.edgeCoords}},{key:"_props",set:function set(b){this._x=b.x,this._y=b.y,this._w=b.w,this._h=b.h},get:function get(){return{x:this._x,y:this._y,w:this._w,h:this._h}}},{key:"props",get:function get(){return{w:this._w,h:this._h}}}]),a}();