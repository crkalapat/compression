import Phaser from "phaser";

class WinSceneRed extends Phaser.Scene {
    
    constructor (winnerParam) {
        super("WinSceneRed");
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
            "Blue" + " has been crushed," +'\n' + "Red" + " wins!" + '\n' + "Press enter to play again",
            { font: "40px Arial", fill: "#000000"}
        );
        nameLabel.setOrigin(0.5, 0.5);

        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        this.startKey.on("up", () => {this.scene.start('GameScene');});

    }
}

export default WinSceneRed;