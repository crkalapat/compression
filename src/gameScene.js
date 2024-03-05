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

        this.load.image("player1-1-left", "assets/blue-walk-left.png");
        this.load.image("player2-1-right", "assets/red-walk-left.png");

        this.load.image("player1-1-right", "assets/blue-walk-right.png");
        this.load.image("player2-1-left", "assets/red-walk-right.png");

        this.load.image("player1-2-left", "assets/blue-walk-left66.png");
        this.load.image("player2-2-left", "assets/red-walk-left-66.png");

        this.load.image("player1-2-right", "assets/blue-walk-right66.png");
        this.load.image("player2-2-right", "assets/red-walk-right66.png");

        this.load.image("player1-3-left", "assets/blue-walk-left33.png");
        this.load.image("player2-3-left", "assets/red-walk-left-33.png");

        this.load.image("player1-3-right", "assets/blue-walk-right33.png");
        this.load.image("player2-3-right", "assets/red-walk-right33.png");
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
        this.outBounds();
    }

    handleCollision() {
        const dif = ((this.player1.body.height + this.player2.body.height) / 2) - 20;
        var width = (this.player1.body.width + this.player2.body.width) / 2; 
        if ((this.player1.body.y <= this.player2.body.y - dif) 
             || 
            ( this.player1.body.y < this.player2.body.y && Math.abs(this.player1.body.x - this.player2.body.x) < width / 2)) {
            this.player1.setVelocityY(-300);
            this.player2.setVelocityY(300);
            this.squish(2);
        }
        else if ((this.player2.body.y <= this.player1.body.y - dif) 
        || 
           ( this.player2.body.y < this.player1.body.y && Math.abs(this.player1.body.x - this.player2.body.x) < width / 2)) {
            this.player2.setVelocityY(-300);
            this.player1.setVelocityY(300);
            this.squish(1);
        } 
    }
    outBounds(){
        if (this.player1.x <= -50)
        {
            this.player1.x = 900;
            this.player1.y = 300;
        }
        else if (this.player1.x >= 1050)
        {
            this.player1.x = 100;
            this.player1.y = 300;
        }
        if (this.player2.x <= -50)
        {
            this.player2.x = 900;
            this.player2.y = 300;
        }
        else if (this.player2.x >= 1050)
        {
            this.player2.x = 100;
            this.player2.y = 300;
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
            this.player1.setTexture(this.getTexture(1, "left", this.p1HP));
        } else if (keyD.isDown) {
            this.player1.body.velocity.x = 200;
            this.player1.setTexture(this.getTexture(1, "right", this.p1HP));
        } else {
            this.player1.body.velocity.x = 0;
            this.player1.setTexture(this.getTexture(1, "", this.p1HP));
        }
        if (this.p1HP === 3) {
        } else if (this.p1HP === 2) {
            this.player1.setSize(this.player1.width - 45, this.player1.height - 10, true);
        } else if (this.p1HP === 1) {
            this.player1.setSize(this.player1.width - 45, this.player1.height, true);  
        } else {
            this.scene.stop("gameScene");
            this.scene.start('WinSceneRed');
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
            this.player2.setTexture(this.getTexture(2, "left", this.p2HP));
        } else if (this.cursors.right.isDown) {
            this.player2.body.velocity.x = 200;
            this.player2.setTexture(this.getTexture(2, "right", this.p2HP));
        } else {
            this.player2.body.velocity.x = 0;
            this.player2.setTexture(this.getTexture(2, "", this.p2HP));
        }

        if (this.p2HP === 3) {
        } else if (this.p2HP === 2) {
            this.player2.setSize(this.player2.width - 45, this.player2.height - 10, true);
        } else if (this.p2HP === 1) {
            this.player2.setSize(this.player2.width - 45, this.player2.height, true);  
        } else {
            this.scene.stop("gameScene");
            this.scene.start('WinSceneBlue');
        }
    }

    // playerNum is 1 or 2
    // key is "left", "right", "standing"
    // hp: 3 ,2,1
    getTexture(playerNum, key, hp) {
        // swap 1 and 3.     because hp 3 is size 1 in the player
        if (hp === 3) {
            hp = 1;
        } else if (hp == 1) {
            hp = 3;
        }
        if (key !== "") {
            key = "-" + key;
        }

        // we have something like
        // "player1-2-left"
        var p = "player" + playerNum + "-" + hp + key;
        return p;
    }

    squish(playerNum) {

        console.log("squish");
        if (playerNum === 1) {
            this.p1HP -= 1;
        } else {
            this.p2HP -= 1;
        }
    }


}

export default GameScene;
