window.addEventListener('load', function () {
    updateGameSize();
});

window.addEventListener('resize', function () {
    updateGameSize();
});

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update
    }
};
const game = new Phaser.Game(config);

let player;
let playerSpeed = 350;
let bullet;
let pointer;
let fireRate = 200;
let nextFire = 0;

let gameWidth = 500;
let gameHeight = 500;

let shouldUpdateRotation = false;

//--------------------------------------

function preload() {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');

    this.load.image('bullet', 'assets/particles/logo.png');

}


function create() {
    // this.add.image(400, 300, 'sky');

    // PLAYER SETUP
    player = this.physics.add.image(400, 100, 'logo');
    player.setBounce(0.2);
    player.setScale(0.5, 0.5)
    player.setCollideWorldBounds(true);

    // MOVEMENT INPUT
    WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // LOOK-AT ROTATION
    this.input.on('pointermove', function (_pointer) {
        shouldUpdateRotation = true;
        pointer = _pointer;
    });

}


function update() {

    addMovementInput();
    updateRotation();

    if (game.input.activePointer.isDown) {
        fire(this);
    }

    this.physics.world.setBounds(0, 0, gameWidth, gameHeight, true, true, true, true);
}

//--------------------------------------
function fire (self) {
    if (game.loop.time > nextFire) {
        nextFire = game.loop.time + fireRate;

        let particles = self.add.particles('red');

        let emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });


        bullet = self.physics.add.image(player.x, player.y, 'logo');
        bullet.setScale(.1, .25);
        bullet.rotation = Phaser.Math.Angle.Between(player.x, player.y, pointer.worldX, pointer.worldY);
        emitter.startFollow(bullet);

        self.physics.moveTo(bullet, pointer.x, pointer.y, 2000)
    }
}

function updateGameSize () {
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;
    game.config.width = gameWidth;
    game.config.height = gameHeight;
    game.resize(gameWidth, gameHeight); // ? Needed?
}

function updateRotation() {
    if (shouldUpdateRotation) {
        player.rotation = Phaser.Math.Angle.Between(player.x, player.y, pointer.worldX, pointer.worldY);
    }
}

function addMovementInput() {

    // UP and LEFT
    if (WKey.isDown && AKey.isDown) {
        player.setVelocity(-playerSpeed, -playerSpeed);
    }
    // UP and RIGHT
    else if (WKey.isDown && DKey.isDown) {
        player.setVelocity(playerSpeed, -playerSpeed);
    }
    // DOWN and LEFT
    else if (SKey.isDown && AKey.isDown) {
        player.setVelocity(-playerSpeed, playerSpeed);
    }
    // DOWN and RIGHT
    else if (SKey.isDown && DKey.isDown) {
        player.setVelocity(playerSpeed, playerSpeed);
    }
    // UP
    else if (WKey.isDown) {
        player.setVelocity(0, -playerSpeed);
    }
    // LEFT
    else if (AKey.isDown) {
        player.setVelocity(-playerSpeed, 0);
    }
    // DOWN
    else if (SKey.isDown) {
        player.setVelocity(0, playerSpeed);
    }
    // RIGHT
    else if (DKey.isDown) {
        player.setVelocity(playerSpeed, 0);
    }
    // STOP MOVING
    else {
        player.setVelocity(0, 0);
    }
}