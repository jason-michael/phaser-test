import Zombie from '../characters/Zombie';

export default class TimeSurvival {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.timeSurvived = -1;
    this.nextUpdate = 0;
    this.enemies = [];
    this.enemiesTotal = 50;
    this.enemiesAlive = null;
    this.difficulty = 1;
    this.maxDifficulty = 3;
    this.zombies = this.game.physics.add.group({
      defaultKey: 'zombie1'
    });
    this.zombieIndex = 0;
  }

  init() {
    for (let i = 0; i < 5; i++) {
      this.spawnEnemy();
    }

    this.game.physics.add.collider(this.zombies, this.player.gun.bullets, (enemy, bullet) => {
      let hitEnemy = this.enemies.find(e => e.index === parseInt(enemy.name));
      hitEnemy.damage();
      bullet.destroy();
      this.player.shotsHit++;
    });

    this.game.physics.add.collider(this.zombies, this.player.sprite, () => {
      this.player.damage();
    });
  }

  update() {
    if (this.enemiesAlive < this.enemiesTotal) this.spawnEnemy();

    // INCREMENT TIME SURVIVED
    if (this.game.time.now > this.nextUpdate && this.difficulty < this.maxDifficulty) {
      this.nextUpdate = this.game.time.now + 1000; // 1 second
      this.difficulty += (this.timeSurvived / 1000) + Math.floor(this.player.enemiesKilled / 100);
      this.timeSurvived++;
      this.enemiesTotal = 10 * this.difficulty * 5;
    }

    // UPDATE ENEMIES ALIVE
    this.enemiesAlive = 0;
    for (let i = 0; i < this.enemies.length; i++) {

      if (this.enemies[i].isAlive) {
        this.enemiesAlive++;
        this.enemies[i].update();
      }
    }
  }

  spawnEnemy() {
    let zombie;
    if (this.player.enemiesKilled % 12 === 0 && this.player.enemiesKilled > 20) {
      // Sprinter
      zombie = new Zombie(this.zombieIndex, 1, this.game, this.player, 300);
    } else {
      // Normal
      zombie = new Zombie(this.zombieIndex, Math.random() + 1 * this.difficulty, this.game, this.player);
    }
    this.enemies.push(zombie);
    this.zombies.add(zombie.sprite)
    this.zombieIndex++;
  }
}