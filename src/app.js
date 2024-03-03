import Phaser from "phaser";
import StartScreenScene from "./startScreenScene";
import GameScene from "./gameScene";

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scene: [StartScreenScene, GameScene],
    physics: {
        default: "arcade",
    },
    backgroundColor: "#bdeeff",
};

const compressionGame = new Phaser.Game(config);