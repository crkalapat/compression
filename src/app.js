import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    preload() {
        this.load.image("floor", "assets/floor.png");
    }
    create() {
        // adding floor
        this.floor = this.physics.add.staticGroup();
        this.floor.create(this.game.config.width/2, this.game.config.height, "floor");
        let justin = true;
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
    backgroundColor: "#bdeeff",
};

const compressionGame = new Phaser.Game(config);