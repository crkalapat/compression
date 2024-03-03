import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    preload() {
        this.load.image("floor", "assets/floor.png");
        this.load.image("player1", "assets/player1.png");
        this.load.image("player2", "assets/player2.png");
    }
    create() {
        // adding floor
        this.floor = this.physics.add.staticGroup();
        this.floor.create(this.game.config.width/2, this.game.config.height, "floor");

        // adding players
        this.player1 = this.physics.add.sprite(150, 300, "player1");
        this.player2 = this.physics.add.sprite(850, 300, "player2");
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