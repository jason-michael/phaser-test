/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/characters/Player.js":
/*!**********************************!*\
  !*** ./src/characters/Player.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _phaser = __webpack_require__(/*! ../phaser */ \"./src/phaser.js\");\n\nvar _phaser2 = _interopRequireDefault(_phaser);\n\nvar _InputBindings = __webpack_require__(/*! ../input/InputBindings */ \"./src/input/InputBindings.js\");\n\nvar _InputBindings2 = _interopRequireDefault(_InputBindings);\n\nvar _Gun = __webpack_require__(/*! ../weapons/Gun */ \"./src/weapons/Gun.js\");\n\nvar _Gun2 = _interopRequireDefault(_Gun);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Player = function () {\n  function Player(game) {\n    _classCallCheck(this, Player);\n\n    this.game = game;\n    this.input = new _InputBindings2.default(game);\n    this.speed = 150;\n\n    // STATS:\n    this.shotsFired = 0;\n    this.shotsHit = 0;\n    this.enemiesKilled = 0;\n\n    this.sprite = game.physics.add.sprite(0, 0, 'player').setMaxVelocity(500).setFriction(400, 200).setCollideWorldBounds(true);\n\n    this.gun = new _Gun2.default(game, this, 200);\n  }\n\n  _createClass(Player, [{\n    key: 'update',\n    value: function update() {\n      this.addMovementInput();\n      this.addRotationInput();\n\n      if (this.input.pointer.isDown) this.gun.fire();\n    }\n  }, {\n    key: 'addRotationInput',\n    value: function addRotationInput() {\n      this.sprite.rotation = _phaser2.default.Math.Angle.Between(this.sprite.x, this.sprite.y, this.input.pointer.x + this.game.cameras.main.scrollX, this.input.pointer.y + this.game.cameras.main.scrollY);\n    }\n  }, {\n    key: 'sprint',\n    value: function sprint() {\n      // SPRINT\n      if (this.input.SHIFT.isDown) {\n        if (this.speed < 150) {\n          this.speed = 150;\n        }\n      } else {\n        this.speed = 75;\n      }\n    }\n  }, {\n    key: 'addMovementInput',\n    value: function addMovementInput() {\n      // Check if sprinting:\n      this.sprint();\n\n      // UP && LEFT\n      if (this.input.W.isDown && this.input.A.isDown) {\n        this.sprite.setVelocity(-this.speed, -this.speed);\n        this.sprite.rotation = 3.14 / 360 * 2 * 210;\n      }\n      // UP && RIGHT\n      else if (this.input.W.isDown && this.input.D.isDown) {\n          this.sprite.setVelocity(this.speed, -this.speed);\n          this.sprite.rotation = 3.14 / 360 * 2 * -45;\n        }\n        // DOWN && LEFT\n        else if (this.input.S.isDown && this.input.A.isDown) {\n            this.sprite.setVelocity(-this.speed, this.speed);\n            this.sprite.rotation = 3.14 / 360 * 2 * 120;\n          }\n          // DOWN && RIGHT\n          else if (this.input.S.isDown && this.input.D.isDown) {\n              this.sprite.setVelocity(this.speed, this.speed);\n              this.sprite.rotation = 3.14 / 360 * 2 * 45;\n            }\n            // UP\n            else if (this.input.W.isDown) {\n                this.sprite.setVelocity(0, -this.speed);\n                this.sprite.rotation = 3.14 / 360 * 2 * -90;\n              }\n              // DOWN\n              else if (this.input.S.isDown) {\n                  this.sprite.setVelocity(0, this.speed);\n                  this.sprite.rotation = 3.14 / 2;\n                }\n                // LEFT\n                else if (this.input.A.isDown) {\n                    this.sprite.setVelocity(-this.speed, 0);\n                    this.sprite.rotation = -3.14;\n                  }\n                  // RIGHT\n                  else if (this.input.D.isDown) {\n                      this.sprite.setVelocity(this.speed, 0);\n                      this.sprite.rotation = 0;\n                    } else {\n                      this.sprite.setVelocity(0);\n                    }\n    }\n  }]);\n\n  return Player;\n}();\n\nexports.default = Player;\n\n//# sourceURL=webpack:///./src/characters/Player.js?");

/***/ }),

/***/ "./src/characters/Zombie.js":
/*!**********************************!*\
  !*** ./src/characters/Zombie.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _phaser = __webpack_require__(/*! ../phaser */ \"./src/phaser.js\");\n\nvar _phaser2 = _interopRequireDefault(_phaser);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Zombie = function () {\n  function Zombie(index, level, game, player) {\n    _classCallCheck(this, Zombie);\n\n    this.index = index;\n    this.level = level;\n    this.game = game;\n    this.player = player;\n    this.bullets = game.bullets;\n    this.spriteImage = this.level % 2 === 0 ? 'zombie2' : 'zombie1';\n\n    this.isAlive = true;\n    this.health = this.level * 1;\n    this.speed = (Math.random() + 1) * (this.level * 20);\n\n    // Get a random spawn point on the map:\n    var spawnLoc = this.game.physics.world.bounds.getRandomPoint();\n\n    // Add the sprite and world collision:\n    this.sprite = game.physics.add.sprite(spawnLoc.x, spawnLoc.y, this.spriteImage).setName(index.toString()).setCollideWorldBounds(true).setDepth(0);\n\n    this.sprite.setScale(1 + this.level / 10);\n  }\n\n  _createClass(Zombie, [{\n    key: 'update',\n    value: function update() {\n      // Move to player:\n      this.game.physics.moveTo(this.sprite, this.player.sprite.x, this.player.sprite.y, this.speed);\n\n      // Rotate towards player:\n      this.sprite.rotation = _phaser2.default.Math.Angle.Between(this.sprite.x, this.sprite.y, this.player.sprite.x, this.player.sprite.y);\n    }\n  }, {\n    key: 'damage',\n    value: function damage() {\n      if (this.health > 1) {\n        this.health--;\n      } else {\n        this.kill();\n      }\n    }\n  }, {\n    key: 'kill',\n    value: function kill() {\n      this.game.effectManager.addCorpse(this.sprite.x, this.sprite.y);\n      this.player.enemiesKilled++;\n      this.isAlive = false;\n      this.sprite.destroy();\n    }\n  }]);\n\n  return Zombie;\n}();\n\nexports.default = Zombie;\n\n//# sourceURL=webpack:///./src/characters/Zombie.js?");

/***/ }),

/***/ "./src/effects/EffectManager.js":
/*!**************************************!*\
  !*** ./src/effects/EffectManager.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar EffectManager = function () {\n  function EffectManager(game) {\n    _classCallCheck(this, EffectManager);\n\n    this.game = game;\n\n    this.maxCorpses = 10;\n    this.corpses = [];\n  }\n\n  _createClass(EffectManager, [{\n    key: 'addCorpse',\n    value: function addCorpse(x, y) {\n      if (this.corpses.length > this.maxCorpses) {\n        this.corpses[0].destroy();\n        this.corpses.shift();\n      }\n\n      var corpse = this.game.add.sprite(x, y, 'corpse').setDepth(-1);\n      this.corpses.push(corpse);\n    }\n  }, {\n    key: 'playGunshot',\n    value: function playGunshot() {\n      this.game.sound.add('gunshot').play();\n    }\n  }]);\n\n  return EffectManager;\n}();\n\nexports.default = EffectManager;\n\n//# sourceURL=webpack:///./src/effects/EffectManager.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _phaser = __webpack_require__(/*! ./phaser */ \"./src/phaser.js\");\n\nvar _phaser2 = _interopRequireDefault(_phaser);\n\nvar _MainScene = __webpack_require__(/*! ./scenes/MainScene */ \"./src/scenes/MainScene.js\");\n\nvar _MainScene2 = _interopRequireDefault(_MainScene);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar config = {\n  type: _phaser2.default.AUTO,\n  width: window.innerWidth,\n  height: window.innerHeight,\n  backgroundColor: '#000',\n  physics: {\n    default: 'arcade',\n    arcade: {\n      debug: false,\n      setBounds: {\n        x: 0,\n        y: 0,\n        width: 2000,\n        height: 2000,\n        thickness: 12\n      }\n    }\n  },\n  scene: [_MainScene2.default]\n};\n\nvar game = new _phaser2.default.Game(config);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/input/InputBindings.js":
/*!************************************!*\
  !*** ./src/input/InputBindings.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar InputBindings = function InputBindings(game) {\n  _classCallCheck(this, InputBindings);\n\n  // MOUSE\n  this.pointer = game.input.activePointer;\n\n  // KEYBOARD\n  this.W = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);\n  this.A = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);\n  this.S = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);\n  this.D = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);\n  this.SHIFT = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);\n  this.PAUSE = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);\n};\n\nexports.default = InputBindings;\n\n//# sourceURL=webpack:///./src/input/InputBindings.js?");

/***/ }),

/***/ "./src/modes/TimeSurvival.js":
/*!***********************************!*\
  !*** ./src/modes/TimeSurvival.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Zombie = __webpack_require__(/*! ../characters/Zombie */ \"./src/characters/Zombie.js\");\n\nvar _Zombie2 = _interopRequireDefault(_Zombie);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar TimeSurvival = function () {\n  function TimeSurvival(game, player) {\n    _classCallCheck(this, TimeSurvival);\n\n    this.game = game;\n    this.player = player;\n    this.timeSurvived = -1;\n    this.nextUpdate = 0;\n    this.enemies = [];\n    this.enemiesTotal = 30;\n    this.enemiesAlive = null;\n    this.difficulty = 1;\n  }\n\n  _createClass(TimeSurvival, [{\n    key: 'init',\n    value: function init() {\n      for (var i = 0; i < 5; i++) {\n        this.spawnEnemy();\n      }\n    }\n  }, {\n    key: 'update',\n    value: function update() {\n      var _this = this;\n\n      if (this.enemiesAlive < this.enemiesTotal) this.spawnEnemy();\n\n      // INCREMENT TIME SURVIVED\n      if (this.game.time.now > this.nextUpdate) {\n        this.nextUpdate = this.game.time.now + 1000; // 1 second\n        this.difficulty = 1 + this.timeSurvived / 100;\n        this.timeSurvived++;\n        // this.enemiesTotal = parseInt(this.timeSurvived / 5);\n      }\n\n      // UPDATE ENEMIES ALIVE\n      this.enemiesAlive = 0;\n\n      var _loop = function _loop(i) {\n\n        if (_this.enemies[i].isAlive) {\n          _this.enemiesAlive++;\n\n          // Disabled for performance.\n          // this.physics.collide(this.enemies[i].zombie, this.player, () => {\n          //     if (this.playerHealth >= 1) this.playerHealth -= 0.1;\n          // });\n\n          _this.game.physics.add.collider(_this.enemies[i].sprite, _this.player.gun.bullets, function (enemy, bullet) {\n            bullet.destroy();\n            _this.player.shotsHit++;\n            _this.enemies[i].damage();\n          });\n\n          _this.enemies[i].update();\n        }\n      };\n\n      for (var i = 0; i < this.enemies.length; i++) {\n        _loop(i);\n      }\n    }\n  }, {\n    key: 'spawnEnemy',\n    value: function spawnEnemy() {\n      this.enemies.push(new _Zombie2.default(1, Math.floor(Math.random() * this.difficulty + 1), this.game, this.player));\n\n      // Disabled for performance:\n      // this.physics.add.overlap(this.enemies[i].zombie, this.player);\n    }\n  }]);\n\n  return TimeSurvival;\n}();\n\nexports.default = TimeSurvival;\n\n//# sourceURL=webpack:///./src/modes/TimeSurvival.js?");

/***/ }),

/***/ "./src/phaser.js":
/*!***********************!*\
  !*** ./src/phaser.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***/ }),

/***/ "./src/scenes/MainScene.js":
/*!*********************************!*\
  !*** ./src/scenes/MainScene.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _phaser = __webpack_require__(/*! ../phaser */ \"./src/phaser.js\");\n\nvar _phaser2 = _interopRequireDefault(_phaser);\n\nvar _Player = __webpack_require__(/*! ../characters/Player */ \"./src/characters/Player.js\");\n\nvar _Player2 = _interopRequireDefault(_Player);\n\nvar _EffectManager = __webpack_require__(/*! ../effects/EffectManager */ \"./src/effects/EffectManager.js\");\n\nvar _EffectManager2 = _interopRequireDefault(_EffectManager);\n\nvar _TimeSurvival = __webpack_require__(/*! ../modes/TimeSurvival */ \"./src/modes/TimeSurvival.js\");\n\nvar _TimeSurvival2 = _interopRequireDefault(_TimeSurvival);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = MainScene = new _phaser2.default.Class({\n\n  Extends: _phaser2.default.Scene,\n\n  caption: null,\n  captionFormat: null,\n  enemies: [],\n  enemiesTotal: 20,\n  enemiesAlive: null,\n  effectManager: null,\n  gameMode: null,\n  land: null,\n  player: null,\n  isPaused: false,\n  inputBindings: null,\n\n  initialize: function initialize() {\n    _phaser2.default.Scene.call(this, { key: 'mainScene' });\n  },\n\n  preload: function preload() {\n    // WORLD\n    this.load.image('earth', 'assets/images/tanks/scorched_earth.png');\n\n    // CHARACTERS\n    this.load.image('player', 'assets/images/topdown/player machinegun.gif');\n    this.load.image('zombie1', 'assets/images/topdown/zombie.gif');\n    this.load.image('zombie2', 'assets/images/topdown/zombie 2.gif');\n\n    // AUDIO\n    this.load.audio('gunshot', 'assets/audio/gunshot.wav');\n\n    // WEAPONS\n    this.load.image('bullet', 'assets/images/tanks/bullet.png');\n\n    // EFFECTS\n    this.load.image('corpse', 'assets/images/blood/corpse.png');\n  },\n\n  create: function create() {\n    // WORLD\n    this.physics.world.setBounds(-1000, -1000, 2000, 2000);\n\n    // LAND (background)\n    this.land = this.add.tileSprite(0, 0, 2000, 2000, 'earth').setDepth(-2);\n    this.land.fixedToCamera = true;\n\n    // PLAYER\n    this.player = new _Player2.default(this);\n\n    // GAME MODE\n    this.gameMode = new _TimeSurvival2.default(this, this.player);\n    this.gameMode.init();\n\n    // CAMERAS\n    this.cameras.main.setBounds(-1000, -1000, 1000, 1000).setName('main');\n    this.cameras.main.startFollow(this.player.sprite);\n\n    // EFFECTS\n    this.effectManager = new _EffectManager2.default(this);\n\n    // ON-SCREEN TEXT\n    var captionStyle = {\n      fill: '#fff',\n      fontFamily: 'monospace',\n      lineSpacing: 4\n    };\n\n    this.captionFormat = 'Time Survived:     %1s\\n' + 'Difficulty:       x%2\\n' + 'Enemies killed:    %3\\n' + 'Health:            %4\\n' + 'Shots fired:       %5\\n' + 'Accuracy:          %6%\\n';\n    this.caption = this.add.text(16, 16, '', captionStyle);\n    this.caption.setScrollFactor(0, 0);\n    this.caption.setDepth(999);\n  },\n\n  update: function update() {\n\n    this.player.update();\n    this.gameMode.update();\n\n    // UPDATE CAPTION TEXT\n    this.caption.setText(_phaser2.default.Utils.String.Format(this.captionFormat, [this.gameMode.timeSurvived, parseFloat(this.gameMode.difficulty).toFixed(1), this.player.enemiesKilled, 'N/A', this.player.shotsFired, Math.floor(this.player.shotsHit / this.player.shotsFired * 100)]));\n  }\n});\n\n//# sourceURL=webpack:///./src/scenes/MainScene.js?");

/***/ }),

/***/ "./src/weapons/Gun.js":
/*!****************************!*\
  !*** ./src/weapons/Gun.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n      value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _InputBindings = __webpack_require__(/*! ../input/InputBindings */ \"./src/input/InputBindings.js\");\n\nvar _InputBindings2 = _interopRequireDefault(_InputBindings);\n\nvar _EffectManager = __webpack_require__(/*! ../effects/EffectManager */ \"./src/effects/EffectManager.js\");\n\nvar _EffectManager2 = _interopRequireDefault(_EffectManager);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Gun = function () {\n      function Gun(game, player, fireRate) {\n            _classCallCheck(this, Gun);\n\n            this.game = game;\n            this.player = player;\n            this.fireRate = fireRate;\n            this.nextFire = 0;\n            this.bullets = this.game.physics.add.group({\n                  defaultKey: 'bullet'\n            });\n            this.input = new _InputBindings2.default(this.game);\n            this.effects = new _EffectManager2.default(this.game);\n      }\n\n      _createClass(Gun, [{\n            key: 'fire',\n            value: function fire() {\n                  if (this.game.time.now > this.nextFire) {\n\n                        // Limit fire rate\n                        this.nextFire = this.game.time.now + this.fireRate;\n\n                        // Bullet spawn\n                        var bullet = this.bullets.getFirstDead(true);\n                        bullet.rotation = this.player.sprite.rotation;\n                        bullet.displayOriginX -= 50;\n                        bullet.displayOriginY -= 23;\n                        bullet.setScale(0.5);\n                        bullet.setPosition(this.player.sprite.x, this.player.sprite.y);\n\n                        // Bullet movement\n                        this.game.physics.moveTo(bullet, this.input.pointer.x + this.game.cameras.main.scrollX, this.input.pointer.y + this.game.cameras.main.scrollY, 1500);\n\n                        this.player.shotsFired++;\n\n                        // Effects\n                        this.game.cameras.main.shake(100, 0.002); // duration, intensity\n                        this.effects.playGunshot();\n\n                        // Limit spawned bullets for performance\n                        if (this.bullets.getChildren().length > 20) this.bullets.clear();\n                  }\n            }\n      }]);\n\n      return Gun;\n}();\n\nexports.default = Gun;\n\n//# sourceURL=webpack:///./src/weapons/Gun.js?");

/***/ })

/******/ });