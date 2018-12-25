import Phaser from '../phaser';
import Player from '../characters/Player';
import EffectManager from '../effects/EffectManager';
import TimeSurvival from '../modes/TimeSurvival';

export default MainScene = new Phaser.Class({

  Extends: Phaser.Scene,

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

  initialize: function() {
    Phaser.Scene.call(this, {key: 'mainScene'});
  },

  preload: function () {
    // WORLD
    this.load.image('earth', 'assets/images/tanks/scorched_earth.png');
    this.load.image('lightGrass', 'assets/images/tanks/light_grass.png');
    this.load.image('darkGrass', 'assets/images/tanks/dark_grass.png');
    this.load.image('sand', 'assets/images/tanks/sand.png');
    this.load.image('lightSand', 'assets/images/tanks/light_sand.png');
    this.backgrounds = ['earth', 'lightGrass', 'darkGrass', 'sand', 'lightSand'];

    // CHARACTERS
    this.load.image('player', 'assets/images/topdown/player pistol.gif');
    this.load.image('player_mg', 'assets/images/topdown/player machinegun.gif');

    this.load.image('zombie1', 'assets/images/topdown/zombie.gif');
    this.load.image('zombie2', 'assets/images/topdown/zombie 2.gif');

    // AUDIO
    this.load.audio('gunshot', 'assets/audio/gunshot.wav');

    // WEAPONS
    this.load.image('bullet', 'assets/images/tanks/bullet.png');

    // EFFECTS
    this.load.image('corpse', 'assets/images/blood/corpse.png');
  },

  getRandomBackground: function () {
    return this.backgrounds[ Math.floor(Math.random() * this.backgrounds.length) ];
  },

  create: function () {
    // WORLD
    this.physics.world.setBounds(-1000, -1000, 2000, 2000);

    // LAND (background)
    this.land = this.add.tileSprite(0, 0, 2000, 2000, this.getRandomBackground()).setDepth(-2);
    this.land.fixedToCamera = true;

    // PLAYER
    this.player = new Player(this);

    // GAME MODE
    this.gameMode = new TimeSurvival(this, this.player);
    this.gameMode.init();

    // CAMERAS
    this.cameras.main.setBounds(-1000, -1000, 1000, 1000).setName('main');
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
    }, this)
  },

  update: function () {

    this.player.update();
    this.gameMode.update();

    // UPDATE CAPTION TEXT
    this.caption.setText(Phaser.Utils.String.Format(this.captionFormat, [
      this.gameMode.timeSurvived,
      parseFloat(this.gameMode.difficulty).toFixed(1),
      this.player.enemiesKilled,
      'N/A',
      this.player.shotsFired,
      Math.floor((this.player.shotsHit / this.player.shotsFired) * 100)
    ]));
  }
});
