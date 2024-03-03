import Phaser from "phaser";

class StartScreenScene extends Phaser.Scene {
    constructor () {
        super("StartScreenScene");
    }

    preload() {
        this.load.image("bg", "assets/bg.png");
    }
    create() {
        let bg = this.add.sprite(0, 0, "bg");
        bg.setOrigin(0, 0); 
        let nameLabel = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2,
            "Compression",
            { font: "100px Arial", fill: "#000000"}
        );
        nameLabel.setOrigin(0.5, 0.5);
        
        let instructionsLabel = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 3,
            "Blue: WASD           Red: ↑ ↓ → ←",
            { font: "30px Arial", fill: "#000000"}
        );
        instructionsLabel.setOrigin(0.5, 0.5);

        let instructionsLabel2 = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 5,
            "Jump on your friends to crush their hopes and dreams (and them)",
            { font: "30px Arial", fill: "#000000"}
        );
        instructionsLabel2.setOrigin(0.5, 0.5);

        let startLabel = this.add.text(
            (2 * this.game.config.width) / 6,
            (2 * this.game.config.height) / 3 + 50,
            "Press Enter To Start",
            { font: "30px Arial", fill: "#000000"}
        );
        startLabel.setOrigin(0.5, 0.5);

        let exitLabel = this.add.text(
            (4 * this.game.config.width) / 6,
            (2 * this.game.config.height) / 3 + 50,
            "Press Backspace To Exit",
            { font: "30px Arial", fill: "#000000"}
        );
        exitLabel.setOrigin(0.5, 0.5);

        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );

        this.exitKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.BACKSPACE
        );

        this.startKey.on("up", () => {this.scene.start('GameScene'); this.scene.manager.update();});
        this.exitKey.on("up", () => {this.game.destroy();});
    }
}

export default StartScreenScene;