import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor () {
        super("GameScene");
    }
    preload() {
        this.load.image("floor", "assets/floor.png");
        this.load.image("player1", "assets/Sprite-blue-front.png");
        this.load.image("player2", "assets/Sprite-red-front.png");
    }
    create() {
        // adding floor
        this.floor = this.physics.add.staticGroup();
        this.floor.create(this.game.config.width/2, this.game.config.height, "floor");
        // adding players
        this.player1 = this.physics.add.sprite(150, 200, "player1");
        this.player2 = this.physics.add.sprite(850, 200, "player2");
        this.physics.add.collider(this.player1, this.floor);
        this.physics.add.collider(this.player2, this.floor);
        this.player1.body.gravity.y = 500;
        this.player2.body.gravity.y = 500;
        this.physics.add.collider(this.player1, this.player2, () => {this.handleCollision();});
        this.player1.body.setSize(this.player1.width - 45, this.player1.height - 9, true);
        this.player2.body.setSize(this.player2.width - 45, this.player2.height - 9, true); 
    }
    update() {
            this.movePlayer1();
            this.movePlayer2();
    }
    handleCollision(){
        if (this.player1.y == this.player2.y - this.player2.height)
        {
            this.player1.setVelocityY(-500);
            this.player2.setVelocityY(500);

        }
        else if (this.player2.y == this.player1.y - this.player1.height)
        {
            this.player2.setVelocityY(-500);
            this.player1.setVelocityY(500);
        }
        else if (this.player1.x == this.player2.x - this.player2.width)
        {
            this.player1.setVelocityX(-500);
            this.player2.setVelocityX(500);
        }
    }

    
    movePlayer1() {
        let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        if (keyW.isDown && this.player1.body.onFloor()) {
            this.player1.body.velocity.y = -400;
        }

        if (keyS.isDown) {
            this.player1.body.velocity.y = 400;
        }

        if (keyA.isDown) {
            this.player1.body.velocity.x = -200;
        } else if (keyD.isDown) {
            this.player1.body.velocity.x = 200;
        }  else {
            this.player1.body.velocity.x = 0;
        }
    }

    movePlayer2() {

        this.cursors = this.input.keyboard.createCursorKeys();

        if (this.cursors.up.isDown && this.player2.body.onFloor()) {
            this.player2.body.velocity.y = -400;
        }

        if (this.cursors.down.isDown) {
            this.player2.body.velocity.y = 400;
        }

        if (this.cursors.left.isDown) {
            this.player2.body.velocity.x = -200;
        } else if (this.cursors.right.isDown) {
            this.player2.body.velocity.x = 200;
        }  else {
            this.player2.body.velocity.x = 0;
        }
    }
    squish1() {
        //this.player1 = this.physics.add.sprite(150, 200, "player1");
    }
}

export default GameScene;