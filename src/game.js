import Phaser from './phaser';
import Player from './characters/Player';
import Zombie from './characters/Zombie';
import EffectManager from './effects/EffectManager';

let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
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
        extend: {
            caption: null,
            captionFormat: null,
            enemies: [],
            enemiesTotal: 20,
            enemiesAlive: null,
            effectManager: null,
            land: null,
            player: null,
            corpses: []
        }
    }
}

let game = new Phaser.Game(config);

function preload() {

    // WORLD
    this.load.image('earth', 'assets/images/tanks/scorched_earth.png');

    // CHARACTERS
    this.load.image('player', 'assets/images/topdown/player machinegun.gif');
    this.load.image('zombie1', 'assets/images/topdown/zombie.gif');
    this.load.image('zombie2', 'assets/images/topdown/zombie 2.gif');

    // AUDIO
    this.load.audio('gunshot', '/assets/audio/gunshot.wav');

    // WEAPONS
    this.load.image('bullet', 'assets/images/tanks/bullet.png');

    // EFFECTS
    this.load.image('corpse', 'assets/images/blood/corpse.png');

}

function create() {

    // WORLD
    this.physics.world.setBounds(-1000, -1000, 2000, 2000);

    // LAND (background)
    this.land = this.add.tileSprite(0, 0, 2000, 2000, 'earth').setDepth(-2);
    this.land.fixedToCamera = true;

    // PLAYER
    this.player = new Player(this);

    // CAMERAS
    this.cameras.main.setBounds(-1000, -1000, 1000, 1000).setName('main');
    this.cameras.main.startFollow(this.player.sprite);

    // SPAWN ENEMIES
    for (let i = 0; i < this.enemiesTotal; i++) {

        this.enemies.push(new Zombie(i, Math.floor(Math.random() * 3 + 1), this, this.player));

        // Disabled for performance:
        // this.physics.add.overlap(this.enemies[i].zombie, this.player);

    }

    // EFFECTS
    this.effectManager = new EffectManager(this);

    // ON-SCREEN TEXT
    let captionStyle = {
        fill: '#fff',
        fontFamily: 'monospace',
        lineSpacing: 4
    };

    this.captionFormat = (
        'Wave:           %1\n' +
        'Health:         %2\n' +
        'Enemies left:   %3\n' +
        'Shots fired:    %4\n' +
        'Accuracy:       %5%\n'
    );
    this.caption = this.add.text(16, 16, '', captionStyle);
    this.caption.setScrollFactor(0, 0);

}

function update() {

    this.player.update();

    // UPDATE ENEMIES ALIVE
    this.enemiesAlive = 0;
    for (let i = 0; i < this.enemies.length; i++) {

        if (this.enemies[i].isAlive) {
            this.enemiesAlive++;

            // Disabled for performance.
            // this.physics.collide(this.enemies[i].zombie, this.player, () => {
            //     if (this.playerHealth >= 1) this.playerHealth -= 0.1;
            // });

            this.physics.add.collider(this.enemies[i].sprite, this.player.gun.bullets, (enemy, bullet) => {
                bullet.destroy();
                this.player.shotsHit++;
                this.enemies[i].damage();

            })

            this.enemies[i].update();
        }

    }

    // UPDATE CAPTION TEXT
    this.caption.setText(Phaser.Utils.String.Format(this.captionFormat, [
        1,
        Math.floor(this.playerHealth),
        this.enemiesAlive,
        this.player.shotsFired,
        Math.floor((this.player.shotsHit / this.player.shotsFired) * 100)
    ]));

}