const Zombie = function (index, game, player, bullets) {

    // SET A RANDOM SPAWN LOCATION
    const loc = game.physics.world.bounds.getRandomPoint();

    // PROPS
    this.game = game;
    this.health = 1;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;
    this.speed = 10;
    this.speedModifier = Math.random() * 4 + 1;

    // ADD ZOMBIE SPRITE (random sprite with varying speed)
    if (Math.floor(Math.random() * 2)) {
        this.zombie = game.physics.add.sprite(loc.x, loc.y, 'zombie1').setName(index.toString());
        this.speed = (Math.random() + 1) * 20;

    } else {
        this.zombie = game.physics.add.sprite(loc.x, loc.y, 'zombie2').setName(index.toString());
        this.speed = (Math.random() + 1) * 40;
        this.health = 2;
    }

    this.zombie.setCollideWorldBounds(true);
}

Zombie.prototype.update = function () {

    // MOVE TO PLAYER
    this.game.physics.moveTo(this.zombie, this.player.x, this.player.y, this.speed * this.speedModifier);
    this.zombie.rotation = Phaser.Math.Angle.Between(
        this.zombie.x,
        this.zombie.y,
        this.player.x,
        this.player.y
    );

}

Zombie.prototype.damage = function () {
    if (this.health > 1) {
        this.health--;
    } else {
        this.kill();
    }
}

Zombie.prototype.kill = function () {
    this.alive = false;
    this.zombie.destroy();
}

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
            bullets: null,
            caption: null,
            captionFormat: null,
            minimap: null,
            enemies: [],
            enemiesTotal: 20,
            enemiesAlive: null,
            fireRate: 100,
            kills: 0,
            land: null,
            nextFire: 0,
            pointer: null,
            player: null,
            playerAccuracy: 0,
            playerHealth: 100,
            playerSpeed: 150,
            shotsFired: 0,
            shotsHit: 0,
            zombie: null,
            keyBindings: {
                WKey: null,
                AKey: null,
                SKey: null,
                DKey: null
            }
        }
    }
}

let game = new Phaser.Game(config);

function preload() {

    this.load.image('player', 'assets/topdown/player machinegun.gif');
    this.load.image('zombie1', 'assets/topdown/zombie.gif');
    this.load.image('zombie2', 'assets/topdown/zombie 2.gif');
    this.load.image('earth', 'assets/tanks/dark_grass.png');
    this.load.image('bullet', 'assets/tanks/bullet.png');

}


function create() {

    // WORLD
    this.physics.world.setBounds(-1000, -1000, 2000, 2000);

    // LAND (background)
    this.land = this.add.tileSprite(0, 0, 2000, 2000, 'earth');
    this.land.fixedToCamera = true;

    // PLAYER
    this.player = this.physics.add.sprite(0, 0, 'player');
    this.player.setMaxVelocity(500).setFriction(400, 200).setCollideWorldBounds(true);

    // CAMERAS
    this.cameras.main.setBounds(-1000, -1000, 1000, 1000).setName('main');
    this.cameras.main.startFollow(this.player);

    // POINTER BINDING
    this.pointer = this.input.activePointer;

    // KEY BINDINGS
    this.keyBindings.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyBindings.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyBindings.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyBindings.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyBindings.ShiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    // BULLETS GROUP
    this.bullets = this.physics.add.group({
        defaultKey: 'bullet'
    });

    // SPAWN ENEMIES
    for (let i = 0; i < this.enemiesTotal; i++) {
        this.enemies.push(new Zombie(i, this, this.player, null));
        this.enemies[i].speedModifier = 0;
        // Disabled for performance.
        // this.physics.add.overlap(this.enemies[i].zombie, this.player);
    }

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

let gameStarted = false; // TODO: remove

function update() {

    // UPDATE ENEMIES ALIVE
    this.enemiesAlive = 0;
    for (let i = 0; i < this.enemies.length; i++) {

        if (this.enemies[i].alive) {
            this.enemiesAlive++;

            // Disabled for performance.
            // this.physics.collide(this.enemies[i].zombie, this.player, () => {
            //     if (this.playerHealth >= 1) this.playerHealth -= 0.1;
            // });

            this.physics.add.collider(this.enemies[i].zombie, this.bullets, (zombie, bullet) => {
                bullet.destroy();
                this.shotsHit++;
                this.enemies[i].damage();

            })

            this.enemies[i].update();
        }

    }


    // Movement
    const kb = this.keyBindings;

    if (kb.ShiftKey.isDown) {
        if (this.playerSpeed < 300) {
            this.playerSpeed = 300;
        }
    } else {
        this.playerSpeed = 150;
    }

    // UP && LEFT
    if (kb.WKey.isDown && kb.AKey.isDown) {
        this.player.setVelocity(-this.playerSpeed, -this.playerSpeed);
        this.player.rotation = (3.14 / 360) * 2 * 210;
    }
    // UP && RIGHT
    else if (kb.WKey.isDown && kb.DKey.isDown) {
        this.player.setVelocity(this.playerSpeed, -this.playerSpeed);
        this.player.rotation = (3.14 / 360) * 2 * -45;
    }
    // DOWN && LEFT
    else if (kb.SKey.isDown && kb.AKey.isDown) {
        this.player.setVelocity(-this.playerSpeed, this.playerSpeed);
        this.player.rotation = (3.14 / 360) * 2 * 120;
    }
    // DOWN && RIGHT
    else if (kb.SKey.isDown && kb.DKey.isDown) {
        this.player.setVelocity(this.playerSpeed, this.playerSpeed);
        this.player.rotation = (3.14 / 360) * 2 * 45;
    }
    // UP
    else if (kb.WKey.isDown) {
        this.player.setVelocity(0, -this.playerSpeed);
        this.player.rotation = (3.14 / 360) * 2 * -90;

        if (!gameStarted) {
            for (let i = 0; i < this.enemiesTotal; i++) {
                this.enemies[i].speedModifier = Math.random() * 4 + 1;
            }

            gameStarted = true;
        }
    }
    // DOWN
    else if (kb.SKey.isDown) {
        this.player.setVelocity(0, this.playerSpeed);
        this.player.rotation = 3.14 / 2;
    }
    // LEFT
    else if (kb.AKey.isDown) {
        this.player.setVelocity(-this.playerSpeed, 0);
        this.player.rotation = -3.14;
    }
    // RIGHT
    else if (kb.DKey.isDown) {
        this.player.setVelocity(this.playerSpeed, 0);
        this.player.rotation = 0;
    } else {
        this.player.setVelocity(0);
    }


    // Rotation
    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.pointer.x + this.cameras.main.scrollX, this.pointer.y + this.cameras.main.scrollY);

    // Fire
    if (this.pointer.isDown && gameStarted) {
        if (this.time.now > this.nextFire) {

            this.nextFire = this.time.now + this.fireRate;

            let bullet = this.bullets.getFirstDead(true);
            bullet.rotation = this.player.rotation;
            bullet.displayOriginX -= 50;
            bullet.displayOriginY -= 23;
            bullet.setScale(0.5)
            bullet.setPosition(this.player.x, this.player.y);

            this.physics.moveTo(bullet, this.pointer.x + this.cameras.main.scrollX, this.pointer.y + this.cameras.main.scrollY, 1500);

            this.shotsFired++;
            if (this.bullets.getChildren().length > 20) this.bullets.clear();
        }

    };

    // UPDATE CAPTION TEXT
    this.caption.setText(Phaser.Utils.String.Format(this.captionFormat, [
        1,
        Math.floor(this.playerHealth),
        this.enemiesAlive,
        this.shotsFired,
        Math.floor((this.shotsHit / this.shotsFired) * 100)
    ]));

    this.playerAccuracy = Math.floor((this.shotsHit / this.shotsFired) * 100);
}
