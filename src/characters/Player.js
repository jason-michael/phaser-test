import Phaser from '../phaser';
import Gun from '../weapons/Gun';

export default class Player {
  constructor(game) {
    this.game = game;
    this.movementScaleX = 0;
    this.movementScaleY = 0;
    this.speed = 150;
    this.health = 1000;
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.enemiesKilled = 0;
    this.isAlive = true;

    this.sprite = game.physics.add
      .sprite(0, 0, 'player')
      .setMaxVelocity(500)
      // .setFriction(400, 200)
      .setCollideWorldBounds(true)

    // Sprite lighting
    this.sprite.setPipeline('Light2D');

    // Controls
    let keyBindings = this.game.input.keyboard;
    let Keys = Phaser.Input.Keyboard.KeyCodes;
    this.W = keyBindings.addKey(Keys.W);
    this.A = keyBindings.addKey(Keys.A);
    this.S = keyBindings.addKey(Keys.S);
    this.D = keyBindings.addKey(Keys.D);
    this.R = keyBindings.addKey(Keys.R);

    // Make the collision hit box smaller.
    this.sprite.body.setSize(44, 44, 0.5);

    this.gun = new Gun(game, this, 200);
  }

  damage() {
    if (this.health > 0) {
      this.health--;
      this.game.cameras.main.flash(400, .2, 0, 0, 0)
    } else {
      this.kill();
    }
  }

  kill() {
    if (this.isAlive) {
      this.isAlive = false;
      this.sprite.setVelocity(0)
      console.log(this.game.flashlight)
      this.game.flashlight.setColor(0xff0000)
    }
  }

  update() {
    if (this.isAlive) {
      this.addMovementInput();
      this.addRotationInput();
    }

    if (this.R.isDown) {
      this.game.scene.restart();
    }

    if (this.game.input.activePointer.isDown && this.isAlive) this.gun.fire();
  }

  addRotationInput() {
    this.sprite.rotation = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      this.game.input.activePointer.x + this.game.cameras.main.scrollX,
      this.game.input.activePointer.y + this.game.cameras.main.scrollY
    );
  }

  addMovementInput() {
    // Y-axis
    if (this.W.isDown) {
      this.movementScaleY = -1;
    } else if (this.S.isDown) {
      this.movementScaleY = 1;
    } else {
      this.movementScaleY = 0;
    }

    // X-axis
    if (this.A.isDown) {
      this.movementScaleX = -1;
    } else if (this.D.isDown) {
      this.movementScaleX = 1;
    } else {
      this.movementScaleX = 0;
    }

    this.sprite.setVelocity(this.speed * this.movementScaleX, this.speed * this.movementScaleY);
  }
}