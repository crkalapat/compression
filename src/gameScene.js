import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image("floor", "assets/floor.png");

        this.load.image("player1-1", "assets/Sprite-blue-front.png"); // untouched
        this.load.image("player1-2", "assets/Sprite-blue-front1.png");
        this.load.image("player1-3", "assets/Sprite-blue-front2.png");

        this.load.image("player2-1", "assets/Sprite-red-front.png"); // untouched
        this.load.image("player2-2", "assets/Sprite-red-front1.png");
        this.load.image("player2-3", "assets/Sprite-red-front2.png");

        //this.load.image("player1-left", "assets/blue-walk-left.png");
        //this.load.image("player2-right", "assets/red-walk-left.png");

        // this.load.image("player1-right", "assets/blue-walk-right.png");
        // this.load.image("player2-left", "assets/red-walk-right.png");

        // this.load.image("player1-left66", "assets/blue-walk-left66.png");
        // this.load.image("player2-left66", "assets/red-walk-left-66.png");

        // this.load.image("player1-right66", "assets/blue-walk-right66.png");
        // this.load.image("player2-right66", "assets/red-walk-right-66.png");
    }
    create() {
        // adding floor
        this.floor = this.physics.add.staticGroup();
        this.floor.create(this.game.config.width / 2, this.game.config.height, "floor");
        // adding players
        this.player1 = this.physics.add.sprite(150, 300, "player1-1");
        this.player2 = this.physics.add.sprite(850, 300, "player2-1");
        this.player1.body.gravity.y = 500;
        this.player2.body.gravity.y = 500;
        this.physics.add.collider(this.player1, this.floor);
        this.physics.add.collider(this.player2, this.floor);
        this.physics.add.collider(this.player1, this.player2, () => { this.handleCollision(); });

        this.player1.body.setSize(this.player1.width - 50, this.player1.height - 10, true);
        this.player2.body.setSize(this.player2.width - 50, this.player2.height - 10, true);

        this.p1HP = 3;
        this.p2HP = 3;
    }

    update() {
        this.movePlayer1();
        this.movePlayer2();
    }

    handleCollision() {
        if (this.player1.y <= this.player2.y - this.player2.body.height) {
            this.player1.setVelocityY(-300);
            this.player2.setVelocityY(300);
            this.squish(2);
        }
        else if (this.player2.y <= this.player1.y - this.player1.body.height) {
            this.player2.setVelocityY(-300);
            this.player1.setVelocityY(300);
            this.squish(1);
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

        // if (keyS.isDown) {
        //     this.player1.body.velocity.y = 400;
        // }

        if (keyA.isDown) {
            this.player1.body.velocity.x = -200;
            // this.player1.setTexture("player1-left");
        } else if (keyD.isDown) {
            this.player1.body.velocity.x = 200;
            // this.player1.setTexture("player1-right");
        } else {
            this.player1.body.velocity.x = 0;
        }
    }

    movePlayer2() {
        this.cursors = this.input.keyboard.createCursorKeys();

        if (this.cursors.up.isDown && this.player2.body.onFloor()) {
            this.player2.body.velocity.y = -400;
        }

        // if (this.cursors.down.isDown) {
        //     this.player2.body.velocity.y = 400;
        // }

        if (this.cursors.left.isDown) {
            this.player2.body.velocity.x = -200;
            // this.player2.setTexture("player2-right");

        } else if (this.cursors.right.isDown) {
            this.player2.body.velocity.x = 200;
            // this.player2.setTexture("player2-left");
        } else {
            this.player2.body.velocity.x = 0;
        }

    }

    squish(playerNum) {

        if (playerNum === 1) {
            this.p1HP -= 1;
            if (this.p1HP === 2) {
                this.player1.setTexture("player1-2");
                this.player1.setSize(this.player1.width - 50, this.player1.height - 10, true);
            } else if (this.P1HP === 1) {
                this.player1.setTexture("player1-3");
                this.player1.setSize(this.player1.width - 50, this.player1.height - 6, true);  
            } else {
                // this.scene.start("WinScene"); 
                // this.scene.manager.update();

                this.scene.restart();
            }

        } else {

            this.p2HP -= 1;
            if (this.p2HP === 2) {
                this.player2.setTexture("player2-2");
                this.player2.setSize(this.player2.width - 50, this.player2.height - 10, true);
            } else if (this.P2HP === 1) {
                this.player2.setTexture("player2-3");
                this.player2.setSize(this.player2.width - 50, this.player2.height - 6, true);        
            } else {
                // this.scene.start("WinScene"); 
                // this.scene.manager.update();

                this.scene.restart();
            }
        }
    }


}

export default GameScene;