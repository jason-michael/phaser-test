import Phaser from '../phaser';

export default class Zombie {
  constructor(index, level, game, player, speed) {
    this.index = index;
    this.level = Math.floor(level);
    this.game = game;
    this.player = player;
    this.bullets = game.bullets;
    this.spriteImage = (this.level % 2 === 0) ? 'zombie2' : 'zombie1';

    this.isAlive = true;
    this.health = Math.floor(this.level * 1);
    this.speed = speed || (Math.random() + 1) * (this.level * 20);

    // Get a random spawn point on the map:
    const spawnLoc = this.game.physics.world.bounds.getRandomPoint();

    // Add the sprite and world collision:
    this.sprite = game.physics.add.sprite(spawnLoc.x, spawnLoc.y, this.spriteImage)
      .setName(index.toString())
      .setCollideWorldBounds(true)
      .setDepth(0);

    // Tighter collision hit box
    let hitBoxSize = this.sprite.width * 0.66;
    this.sprite.body.setSize(hitBoxSize, hitBoxSize, 0.5);

    this.sprite.setScale(1 + (this.level / 10));

    this.sprite.setPipeline('Light2D');

    this.game.physics.add.collider(this.sprite, this.player.sprite)
  }

  update() {
    // Move to player:
    this.game.physics.moveTo(this.sprite, this.player.sprite.x, this.player.sprite.y, this.speed);

    // Rotate towards player:
    this.sprite.rotation = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      this.player.sprite.x,
      this.player.sprite.y
    );
  }

  damage() {
    if (this.health > 1) {
      this.health--;
    } else {
      this.kill();
    }
  }

  kill() {
    this.game.effectManager.addCorpse(this.sprite.x, this.sprite.y);
    this.player.enemiesKilled++;
    this.isAlive = false;
    this.sprite.destroy();
  }
}