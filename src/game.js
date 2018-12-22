import Phaser from './phaser';
import MainScene from './scenes/MainScene';

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
  scene: [MainScene]
}

let game = new Phaser.Game(config);
