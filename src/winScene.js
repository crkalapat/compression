import Phaser from "phaser";

class StartScreenScene extends Phaser.Scene {
    winner = new String;
    loser = new String;
    constructor (winner) {
        super("StartScreenScene");
        this.winner = winner;
        if (this.winner == "red") {
            loser = "blue"
        }
        else {
            loser = "red";
        }
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
            loser + " has been crushed," +'\n' + winner +" wins!",
            { font: "100px Arial", fill: "#000000"}
        );
        nameLabel.setOrigin(0.5, 0.5);
    }
}

export default StartScreenScene;