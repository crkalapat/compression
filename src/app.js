import Phaser from "phaser";

class GameScene extends Phaser.scene {
    preload() {

    }
    create() {

    }
    update() {

    }
}

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scene: GameScene,
    physics: {
        default: "arcade",
    },
    backgroundColor: "#202020",
};

const compressionGame = new Phaser.Game(config);