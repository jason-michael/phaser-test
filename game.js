

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
let playerSpeed = 300;


function preload() {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

let pointer;
function create() {
    this.add.image(400, 300, 'sky');

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
        pointer = _pointer;
    });
}

function update() {

    addMovementInput();
    updateRotation();

}

function updateRotation () {
    player.rotation = Phaser.Math.Angle.Between(player.x, player.y, pointer.worldX, pointer.worldY);
}

function addMovementInput () {

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