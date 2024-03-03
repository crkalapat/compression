import Phaser from "phaser";
import StartScreenScene from "./startScreenScene";
import GameScene from "./gameScene";
import WinSceneRed from "./winSceneRed";
import WinSceneBlue from "./winSceneBlue";

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scene: [StartScreenScene, GameScene, WinSceneBlue, WinSceneRed],
    physics: {
        default: "arcade",
    },
    backgroundColor: "#bdeeff",
};

const compressionGame = new Phaser.Game(config);