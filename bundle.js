/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.DIM_X = 1200;
    this.DIM_Y = 600;
    this.keys = {
      upKey: false,
      downKey: false,
      leftKey: false,
      rightKey: false
    };
    this.mo = new _moving_object__WEBPACK_IMPORTED_MODULE_0__.default(this);
  }

  _createClass(Game, [{
    key: "draw",
    value: function draw(ctx) {
      //background
      ctx.fillStyle = "lightblue";
      ctx.fillRect(0, 0, 1200, 600); //moving object

      this.mo.draw(ctx);
    }
  }, {
    key: "step",
    value: function step() {
      this.mo.step();
    }
  }]);

  return Game;
}();



/***/ }),

/***/ "./js/game_view.js":
/*!*************************!*\
  !*** ./js/game_view.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameView)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./js/game.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var GameView = /*#__PURE__*/function () {
  function GameView() {
    _classCallCheck(this, GameView);

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1200;
    this.canvas.height = 600;
    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__.default();
  }

  _createClass(GameView, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.bindKeyHandlers();
      setInterval(function () {
        _this.game.step(), _this.game.draw(_this.ctx);
      }, 1000 / 30);
    }
  }, {
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      var _this2 = this;

      document.addEventListener("keydown", function (e) {
        if (e.key === "w") {
          _this2.game.keys.upKey = true;
        } else if (e.key === "a") {
          _this2.game.keys.leftKey = true;
        } else if (e.key === "s") {
          _this2.game.keys.downKey = true;
        } else if (e.key === "d") {
          _this2.game.keys.rightKey = true;
        }
      });
      document.addEventListener("keyup", function (e) {
        if (e.key === "w") {
          _this2.game.keys.upKey = false;
        } else if (e.key === "a") {
          _this2.game.keys.leftKey = false;
        } else if (e.key === "s") {
          _this2.game.keys.downKey = false;
        } else if (e.key === "d") {
          _this2.game.keys.rightKey = false;
        }
      });
    }
  }]);

  return GameView;
}();



/***/ }),

/***/ "./js/moving_object.js":
/*!*****************************!*\
  !*** ./js/moving_object.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MovingObject)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MovingObject = /*#__PURE__*/function () {
  function MovingObject(game) {
    _classCallCheck(this, MovingObject);

    this.game = game;
    this.width = 50;
    this.height = 100;
    this.vel = {
      x: 0,
      y: 0
    };
    this.maxSpeed = 7;
    this.friction = 0.3;
    this.pos = {
      x: game.DIM_X / 2 - this.width / 2,
      y: game.DIM_Y - this.height - 10
    };
  }

  _createClass(MovingObject, [{
    key: "update",
    value: function update() {
      var _this$game$keys = this.game.keys,
          upKey = _this$game$keys.upKey,
          downKey = _this$game$keys.downKey,
          leftKey = _this$game$keys.leftKey,
          rightKey = _this$game$keys.rightKey; //Handle Horizontal Movement

      if (!leftKey && !rightKey || leftKey && rightKey) {
        this.vel.x *= this.friction;
      } //only if left key is pressed and less than max speed
      else if (leftKey && this.vel.x > -this.maxSpeed) {
          this.vel.x -= 1;
        } //only if right key is pressed and less than max speed
        else if (rightKey && this.vel.x < this.maxSpeed) {
            this.vel.x += 1;
          }

      if (upKey) {
        this.vel.y = -15;
      }

      this.vel.y += 2;
    }
  }, {
    key: "step",
    value: function step() {
      this.update();
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "blue";
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }]);

  return MovingObject;
}();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ "./js/game_view.js");


document.addEventListener("DOMContentLoaded", function () {
  console.log("Webpack is working");
  var gameview = new _game_view__WEBPACK_IMPORTED_MODULE_1__.default();
  gameview.start(); // let moving_object = new MovingObject(GAME_WIDTH, GAME_HEIGHT)
  // moving_object.draw(ctx);
  // ctx.fillStyle = "blue"
  // ctx.fillRect(0, 0, 20, 20)
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map