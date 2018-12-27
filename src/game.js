import Phaser from './phaser';
import Player from './characters/Player';
import EffectManager from './effects/EffectManager';
import TimeSurvival from './modes/TimeSurvival';

let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: true,
  backgroundColor: '#000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      setBounds: {
        x: 0,
        y: 0,
        width: 2000,
        height: 2000,
        thickness: 12
      }
    }
  },
  scene: {
    preload,
    create,
    update,
    extends: {
      backgrounds: [],
      caption: null,
      captionFormat: null,
      enemies: [],
      enemiesTotal: 20,
      enemiesAlive: null,
      effectManager: null,
      gameMode: null,
      land: null,
      player: null,
      isPaused: false,
      inputBindings: null,
      flashlight: null
    }
  }
}

let game = new Phaser.Game(config);



function preload() {
  // WORLD
  this.load.image('earth', ['assets/images/tanks/scorched_earth.png', 'assets/images/tanks/scorched_earth_n.png']);
  this.load.image('lightGrass', 'assets/images/tanks/light_grass.png');
  this.load.image('darkGrass', 'assets/images/tanks/dark_grass.png');
  this.load.image('sand', 'assets/images/tanks/sand.png');
  this.load.image('lightSand', 'assets/images/tanks/light_sand.png');
  this.backgrounds = ['earth', 'lightGrass', 'darkGrass', 'sand', 'lightSand'];

  // CHARACTERS
  this.load.image('player', ['assets/images/topdown/playerPistol.gif', 'assets/images/topdown/playerPistol_n.png']);
  this.load.image('player_mg', 'assets/images/topdown/player machinegun.gif');

  this.load.image('zombie1', ['assets/images/topdown/zombie.gif', 'assets/images/topdown/playerPistol_n.png']);
  this.load.image('zombie2', 'assets/images/topdown/zombie 2.gif');

  // AUDIO
  this.load.audio('gunshot', 'assets/audio/gunshot.wav');

  // WEAPONS
  this.load.image('bullet', 'assets/images/tanks/bullet.png');

  // EFFECTS
  this.load.image('corpse', 'assets/images/blood/corpse.png');
}

function getRandomBackground(game) {
  return game.backgrounds[Math.floor(Math.random() * game.backgrounds.length)];
}

function create() {
  // WORLD
  this.physics.world.setBounds(-1000, -1000, 2000, 2000);

  // LAND (background)
  this.land = this.add.tileSprite(0, 0, 2000, 2000, 'earth').setDepth(-2);
  this.land.fixedToCamera = true;
  this.land.setPipeline('Light2D');

  // PLAYER
  this.player = new Player(this);
  this.player.sprite.setPipeline('Light2D');

  // GAME MODE
  this.gameMode = new TimeSurvival(this, this.player);
  this.gameMode.init();

  // CAMERAS
  this.cameras.main.setBounds(-1000, -1000, 1900, 2000).setName('main');
  this.cameras.main.startFollow(this.player.sprite);

  // EFFECTS
  this.effectManager = new EffectManager(this);

  // ON-SCREEN TEXT
  let captionStyle = {
    fill: '#fff',
    fontFamily: 'monospace',
    lineSpacing: 4
  };

  this.captionFormat = (
    'Time Survived:     %1s\n' +
    'Difficulty:       x%2\n' +
    'Enemies killed:    %3\n' +
    'Health:            %4\n' +
    'Shots fired:       %5\n' +
    'Accuracy:          %6%\n'
  );
  this.caption = this.add.text(16, 16, '', captionStyle);
  this.caption.setScrollFactor(0, 0);
  this.caption.setDepth(999);

  this.input.keyboard.on('keydown_P', function () {

    if (this.isPaused) {
      this.isPaused = false;
      this.scene.resume();
      this.cameras.main.setZoom(1);
      this.caption.setVisible(true);
    } else {
      this.isPaused = true;
      this.scene.pause();
      this.cameras.main.setZoom(2);
      this.caption.setVisible(false);
    }
  }, this);

  this.flashlight = this.lights.addLight(0, 0, 400);
  this.lights.enable().setAmbientColor(0x080808);
}

let i = 0;
function update() {

  this.player.update();
  this.gameMode.update();

  if (i % 4 === 0) {
    this.flashlight.setIntensity(Math.random() * (1.15 - 0.85) + 0.85);
    this.flashlight.setRadius((Math.random() * (405 - 395) + 390));

  }

  // UPDATE CAPTION TEXT
  this.caption.setText(Phaser.Utils.String.Format(this.captionFormat, [
    this.gameMode.timeSurvived,
    parseFloat(this.gameMode.difficulty).toFixed(1),
    this.player.enemiesKilled,
    this.player.health,
    this.player.shotsFired,
    Math.floor((this.player.shotsHit / this.player.shotsFired) * 100)
  ]));

  i++;
}