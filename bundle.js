/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/attack_box.js":
/*!**************************!*\
  !*** ./js/attack_box.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AttackBox)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AttackBox = /*#__PURE__*/function () {
  function AttackBox(x, y, width, height, vel, xRange, yRange) {
    _classCallCheck(this, AttackBox);

    this.pos = {
      x: x,
      y: y
    };
    this.range = {
      x: xRange,
      y: yRange
    };
    this.width = width + Math.abs(xRange);
    this.height = height + Math.abs(yRange);
    this.vel = vel;
  }

  _createClass(AttackBox, [{
    key: "step",
    value: function step(x, y, vel) {
      this.pos.x = x + this.range.x;
      this.pos.y = y + this.range.y;
      this.vel = vel;
    } //Draw for testing only

  }, {
    key: "draw",
    value: function draw(ctx) {
      // console.log(this.width);
      ctx.fillStyle = "purple";
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }]);

  return AttackBox;
}();



/***/ }),

/***/ "./js/border.js":
/*!**********************!*\
  !*** ./js/border.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Border)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Border = /*#__PURE__*/function () {
  function Border(x, y, width, height, type) {
    _classCallCheck(this, Border);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  _createClass(Border, [{
    key: "draw",
    value: function draw(ctx) {
      if (this.type === 1) {
        ctx.fillStyle = "green";
      } else if (this.type === 2) {
        ctx.fillStyle = "brown";
      }

      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }]);

  return Border;
}();



/***/ }),

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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./js/player.js");
/* harmony import */ var _monster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./monster */ "./js/monster.js");
/* harmony import */ var _border__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./border */ "./js/border.js");
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
      rightKey: false,
      attackKey: false
    };
    this.timePassed = 0;
    this.background = new Image();
    this.background.src = "./assets/background/game-background.jpeg";
    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__.default(this); //this.monster = new Monster(this);

    this.borders = [];
    this.enemies = [];
    this.populateBorders();
    this.populateEnemies();
  }

  _createClass(Game, [{
    key: "populateBorders",
    value: function populateBorders() {
      for (var i = 0; i < 12; i++) {
        this.borders.push(new _border__WEBPACK_IMPORTED_MODULE_3__.default(0 + 100 * i, this.DIM_Y - 100, 100, 100, 1));
      }
    }
  }, {
    key: "populateEnemies",
    value: function populateEnemies() {
      for (var i = 0; i < 1; i++) {
        this.enemies.push(new _monster__WEBPACK_IMPORTED_MODULE_2__.default(this));
      }
    }
  }, {
    key: "handleCollisions",
    value: function handleCollisions() {
      var _this = this;

      this.player.handleGameScreenCollision();
      this.borders.forEach(function (border) {
        _this.player.handleCollision(border);
      });

      if (this.player.attacking && this.player.attackFrames < 6) {
        var toBeDeleted = [];
        this.enemies.forEach(function (enemy, idx) {
          if (_this.player.handleAttackCollision(enemy)) {
            toBeDeleted.push(idx - toBeDeleted.length);
          }
        });
        toBeDeleted.forEach(function (idx) {
          delete _this.enemies[idx];
        });
      }
    }
  }, {
    key: "step",
    value: function step() {
      this.player.step();
      this.enemies.forEach(function (enemy) {
        enemy.step();
      });
      this.handleCollisions();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      //background
      //ctx.fillStyle = "lightblue";
      ctx.fillStyle = "rgba(30,139,195, 0.6)";
      ctx.fillRect(0, 0, 1200, 600);
      ctx.drawImage(this.background, 0, 0, 1200, 610); //moving object

      this.player.draw(ctx);
      this.enemies.forEach(function (enemy) {
        enemy.draw(ctx);
      }); //Borders

      this.borders.forEach(function (border) {//border.draw(ctx)
      }); //draw circle
      // ctx.beginPath();
      // ctx.arc(10, 10, 10, 0, 2 * Math.PI);
      // ctx.strokeStyle = "red";
      // ctx.stroke();
      // ctx.fillStyle = "red";
      // ctx.fill();
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
        } else if (e.key === "p") {
          _this2.game.keys.attackKey = true;
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
        } else if (e.key === "p") {
          _this2.game.keys.attackKey = false;
        }
      });
    }
  }]);

  return GameView;
}();



/***/ }),

/***/ "./js/monster.js":
/*!***********************!*\
  !*** ./js/monster.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Monster)
/* harmony export */ });
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
/* harmony import */ var _monster_sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monster_sprite */ "./js/monster_sprite.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Monster = /*#__PURE__*/function (_MovingObject) {
  _inherits(Monster, _MovingObject);

  var _super = _createSuper(Monster);

  function Monster(game) {
    var _this;

    _classCallCheck(this, Monster);

    _this = _super.call(this, game.DIM_X - 60, //x
    game.DIM_Y - 100 - 110, //y
    50, //width
    50, //height
    "red", //color
    game);
    _this.vel.x = -5;
    _this.vel.y = -3;
    _this.maxMoveSpeed = 10;
    _this.maxRange = 30;
    _this.current = 0;
    _this.sprite = new _monster_sprite__WEBPACK_IMPORTED_MODULE_1__.default();
    return _this;
  } // on death create death animation sprite to the game object
  // delete self after hit
  // but death sprite will play


  _createClass(Monster, [{
    key: "update",
    value: function update() {
      if (Math.abs(this.current) >= this.maxRange) {
        this.vel.y *= -1;
      }

      this.current += this.vel.y;
      this.sprite.update();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      // super.draw(ctx)
      this.sprite.draw(ctx, this.pos.x, this.pos.y);
    }
  }]);

  return Monster;
}(_moving_object__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./js/monster_sprite.js":
/*!******************************!*\
  !*** ./js/monster_sprite.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MonsterSprite)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MonsterSprite = /*#__PURE__*/function () {
  function MonsterSprite() {
    _classCallCheck(this, MonsterSprite);

    this.spriteWidth = 168;
    this.spriteHeight = 168;
    this.cols = 4;
    this.rows = 4;
    this.width = this.spriteWidth / this.cols;
    this.height = this.spriteHeight / this.rows;
    this.curFrame = 0;
    this.frameCount = 16;
    this.srcX = 0;
    this.srcY = 0;
    this.sprite = new Image();
    this.sprite.src = "./assets/floating_monster/fire-skull-c.png";
  }

  _createClass(MonsterSprite, [{
    key: "setupSprites",
    value: function setupSprites() {}
  }, {
    key: "update",
    value: function update() {
      this.curFrame = (this.curFrame + .5) % this.frameCount;
      this.srcX = (this.cols - Math.floor(this.curFrame % this.cols) - 1) * this.width;
      this.srcY = Math.floor(this.curFrame / this.rows) * this.height;
    }
  }, {
    key: "draw",
    value: function draw(ctx, x, y) {
      ctx.drawImage(this.sprite, this.srcX, this.srcY, this.width, this.height, x - 20, y - 15, this.width * 2, this.height * 2);
    }
  }]);

  return MonsterSprite;
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
  function MovingObject(x, y, width, height, color, game) {
    _classCallCheck(this, MovingObject);

    this.game = game;
    this.width = width;
    this.height = height;
    this.vel = {
      x: 0,
      y: 0
    };
    this.color = color;
    this.pos = {
      x: x,
      y: y
    };
  }

  _createClass(MovingObject, [{
    key: "update",
    value: function update() {}
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
      ctx.fillStyle = this.color; // console.log(this.pos.x);

      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }]);

  return MovingObject;
}();



/***/ }),

/***/ "./js/player.js":
/*!**********************!*\
  !*** ./js/player.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./js/moving_object.js");
/* harmony import */ var _attack_box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attack_box */ "./js/attack_box.js");
/* harmony import */ var _player_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player_sprite */ "./js/player_sprite.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var Player = /*#__PURE__*/function (_MovingObject) {
  _inherits(Player, _MovingObject);

  var _super = _createSuper(Player);

  function Player(game) {
    var _this;

    _classCallCheck(this, Player);

    _this = _super.call(this, 60, //x
    game.DIM_Y - 100 - 100, //y
    50, //width
    100, //height
    "blue", game); //Jump Variables

    _this.jumping = false;
    _this.dJumping = false; //Sprite + Sprite Start Positions

    _this.sprite = new _player_sprite__WEBPACK_IMPORTED_MODULE_2__.default();
    _this.facing = "right";
    _this.motion = "idle"; //Attack Variables

    _this.attackFrames = 0;
    _this.attacking = false; //Attack Hit Boxes + Variables

    _this.range = {
      x: 125,
      y: 100
    };
    _this.rightAttackBox = new _attack_box__WEBPACK_IMPORTED_MODULE_1__.default(_this.pos.x - _this.range.x, _this.pos.y, _this.width, _this.height, _this.vel, _this.range.x, -_this.range.y);
    _this.leftAttackBox = new _attack_box__WEBPACK_IMPORTED_MODULE_1__.default(_this.pos.x, _this.pos.y, _this.width, _this.height, _this.vel, -_this.range.x, -_this.range.y); //Speed Variables

    _this.maxMoveSpeed = 10;
    _this.maxFallSpeed = 15;
    _this.friction = 0.3;
    return _this;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      var _this$game$keys = this.game.keys,
          upKey = _this$game$keys.upKey,
          leftKey = _this$game$keys.leftKey,
          rightKey = _this$game$keys.rightKey,
          attackKey = _this$game$keys.attackKey; //downKey not used
      //Handle Horizontal Movement

      this.walk(leftKey, rightKey); //jump

      this.jump(upKey); //gravity

      this.vel.y <= this.maxFallSpeed ? this.vel.y += 2 : "";
      this.vel.x = Math.round(this.vel.x);
      this.vel.y = Math.round(this.vel.y);
      if (this.vel.y > 2) this.motion = "fall"; //attack

      this.attack(attackKey); //attackBox
      //sprite

      this.sprite.update(this.facing, this.motion);
    }
  }, {
    key: "step",
    value: function step() {
      _get(_getPrototypeOf(Player.prototype), "step", this).call(this); //attackBox


      this.rightAttackBox.step(this.pos.x - this.range.x, this.pos.y, this.vel);
      this.leftAttackBox.step(this.pos.x, this.pos.y, this.vel);
    }
  }, {
    key: "attack",
    value: function attack(attackKey) {
      this.attackFrames != 0 ? this.attackFrames-- : this.attacking = false;

      if (attackKey && !this.attacking) {
        this.attacking = true;
        this.attackFrames = 12;
      }

      if (this.attacking) {
        this.motion = "attack";
      }
    }
  }, {
    key: "walk",
    value: function walk(leftKey, rightKey) {
      if (!leftKey && !rightKey || leftKey && rightKey) {
        this.vel.x *= this.friction;
        if (this.motion !== "jump") this.motion = "idle";
        return;
      } //only if left key is pressed and less than max speed
      else if (leftKey && this.vel.x > -this.maxMoveSpeed) {
          if (this.vel.x > 0) this.vel.x = 0;
          this.vel.x -= 1;
          if (!this.attacking) this.facing = "left";
        } //only if right key is pressed and less than max speed
        else if (rightKey && this.vel.x < this.maxMoveSpeed) {
            if (this.vel.x < 0) this.vel.x = 0;
            this.vel.x += 1;
            if (!this.attacking) this.facing = "right";
          }

      if (this.motion != 'jump') this.motion = "run";
    }
  }, {
    key: "jump",
    value: function jump(upKey) {
      if (upKey && !this.jumping) {
        this.vel.y = -25;
        this.jumping = true;
        this.motion = "jump";
      } else if (upKey && !this.dJumping && this.letgo) {
        this.vel.y = -25;
        this.motion = "jump";
        this.dJumping = true;
      } else if (!upKey) {
        this.letgo = true;
      }
    }
  }, {
    key: "handleGameScreenCollision",
    value: function handleGameScreenCollision() {
      if (this.pos.x < 0) this.pos.x = 0;else if (this.pos.x + this.width > this.game.DIM_X) this.pos.x = this.game.DIM_X - this.width;
      if (this.pos.y < 0) this.pos.y = 0;else if (this.pos.y + this.height > this.game.DIM_Y) this.pos.y = this.game.DIM_Y - this.height;
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(other) {
      // need to check for intersection
      //Handle placement
      if (this.pos.y + this.height >= other.y) {
        this.pos.y = other.y - this.height;
        this.vel.y = 0;

        if (this.jumping) {
          this.motion = "idle";
        }

        this.jumping = false;
        this.dJumping = false;
        this.letgo = false;
      }
    }
  }, {
    key: "handleAttackCollision",
    value: function handleAttackCollision(enemy) {
      var _enemy$pos = enemy.pos,
          enemyX = _enemy$pos.x,
          enemyY = _enemy$pos.y; // let enemyY = enemy.pos.y;

      var attack = this.facing === "left" ? this.leftAttackBox : this.rightAttackBox;
      var _attack$pos = attack.pos,
          x = _attack$pos.x,
          y = _attack$pos.y;

      if (x >= enemyX + enemy.width) {
        return false;
      } else if (x + attack.width <= enemyX) {
        return false;
      } else if (y > enemyY + enemy.height) {
        return false;
      } else if (y + attack.height <= enemyY) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "blue"; // console.log(this.pos.x);
      // ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
      //draw attack box
      // this.leftAttackBox.draw(ctx);
      //Sprites WIP

      this.sprite.draw(ctx, this.pos.x, this.pos.y, this.facing, this.motion);
    }
  }]);

  return Player;
}(_moving_object__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./js/player_sprite.js":
/*!*****************************!*\
  !*** ./js/player_sprite.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayerSprite)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PlayerSprite = /*#__PURE__*/function () {
  function PlayerSprite() {
    _classCallCheck(this, PlayerSprite);

    this.spriteWidth = 1280;
    this.spriteHeight = 110;
    this.cols = 8;
    this.rows = 1;
    this.width = this.spriteWidth / this.cols;
    this.height = this.spriteHeight / this.rows;
    this.curFrame = 0;
    this.frameCount = 8;
    this.srcX = 0;
    this.srcY = 0; //this.speed = 12;

    this.setupSprites(); // this.sprite = new Image();
    // this.sprite.src = "./assets/player/RightIdle.png";
  }

  _createClass(PlayerSprite, [{
    key: "setupSprites",
    value: function setupSprites() {
      this.sprites = {
        right: {
          idle: new Image(),
          run: new Image(),
          jump: new Image(),
          fall: new Image(),
          attack: new Image()
        },
        left: {
          idle: new Image(),
          run: new Image(),
          jump: new Image(),
          fall: new Image(),
          attack: new Image()
        }
      };
      this.sprites.right.idle.src = "./assets/player/RightIdle.png";
      this.sprites.left.idle.src = "./assets/player/LeftIdle.png";
      this.sprites.right.run.src = "./assets/player/RightRun.png";
      this.sprites.left.run.src = "./assets/player/LeftRun.png";
      this.sprites.right.jump.src = "./assets/player/RightJump.png";
      this.sprites.left.jump.src = "./assets/player/LeftJump.png";
      this.sprites.right.fall.src = "./assets/player/RightFall.png";
      this.sprites.left.fall.src = "./assets/player/LeftFall.png";
      this.sprites.right.attack.src = "./assets/player/RightAttack3.png";
      this.sprites.left.attack.src = "./assets/player/LeftAttack3.png";
    }
  }, {
    key: "updateParams",
    value: function updateParams(motion) {
      if (motion === "attack") {
        this.spriteWidth = 640;
        this.cols = 4;
        this.rows = 1;
        this.width = this.spriteWidth / this.cols;
        this.height = this.spriteHeight / this.rows;

        if (this.lastMotion != "attack") {
          this.curFrame = 0;
        }

        this.curFrame = this.curFrame;
        this.frameCount = 4;
        this.srcX = 0;
        this.srcY = 0;
      } else if (motion === "jump" || motion === "fall") {
        this.spriteWidth = 320;
        this.cols = 2;
        this.rows = 1;
        this.width = this.spriteWidth / this.cols;
        this.height = this.spriteHeight / this.rows;
        this.curFrame = this.curFrame > 2 ? 0 : this.curFrame;
        this.frameCount = 2;
        this.srcX = 0;
        this.srcY = 0;
      } else {
        this.spriteWidth = 1280;
        this.cols = 8;
        this.rows = 1;
        this.width = this.spriteWidth / this.cols;
        this.height = this.spriteHeight / this.rows;
        this.curFrame = this.curFrame;
        this.frameCount = 8;
        this.srcX = 0;
        this.srcY = 0;
      }
    }
  }, {
    key: "update",
    value: function update(facing, motion) {
      this.updateParams(motion);
      this.lastMotion = motion;
      this.curFrame = (this.curFrame + .25) % this.frameCount;

      if (facing == "right") {
        this.srcX = Math.floor(this.curFrame) * this.width;
      } else {
        this.srcX = (this.frameCount - Math.floor(this.curFrame) - 1) * this.width;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx, x, y, facing, motion) {
      // ctx.save();
      // ctx.scale(-1, 1);
      var sprite = this.sprites[facing][motion];
      ctx.drawImage(sprite, this.srcX, this.srcY, this.width, this.height, x - 135, y - 110, this.width * 2, this.height * 2); // ctx.restore()
      // requestAnimationFrame(draw);
    }
  }]);

  return PlayerSprite;
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