function Ball(playerOne, playerTwo) {
    this.x = (800 - 20) / 2;
    this.y = (400 - 20) / 2;
    this.height = 20;
    this.width = 20;

    this.collideX = this.x + 10;
    this.collideY = this.y + 10;
    this.collideHeight = 1;
    this.collideWidth = 1;

    this.playerOne = playerOne;
    this.playerTwo = playerTwo;

    this.directionX = Math.floor(Math.random() * 2) - 1;
    this.directionY = Math.random() * 3 - 1;

    if (this.directionX == 0) {
        this.directionX = 1;
    }

    this.speed = 2;
}

Ball.prototype = {
    constructor: Ball,
    draw: function(context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function(elapsedTime) {

        //this.x = this.x - this.speedX * elapsedTime / 10;
        //this.y = this.y - this.speedY * elapsedTime / 10;
        this.x = this.x - this.directionX / Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY) * this.speed * elapsedTime / 10;
        this.y = this.y - this.directionY / Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY) * this.speed * elapsedTime / 10;

        this.collideX = this.x + 10;
        this.collideY = this.y + 10;

        if (this.y < 0) {
            //this.speedY = -this.speedY;
            this.directionY = -Math.abs(this.directionY)
        }
        if (this.y > 400 - this.height) {
            this.directionY = Math.abs(this.directionY)
        }
        if (this.collide(this.playerOne)) {
            var place = this.collideY - this.playerOne.y - 35;
            this.directionX = -Math.abs(this.directionX);
            console.log(place);
            this.directionY = -place / 15;
            this.speed += 0.2;
            if (this.speed > 18) {
                this.speed = 18;
            }
        }
        if (this.collide(this.playerTwo)) {
            var place = this.collideY - this.playerTwo.y - 35;
            this.directionX = Math.abs(this.directionX);
            this.directionY = -place / 15;
            this.speed += 0.2;
            if (this.speed > 18) {
                this.speed = 18;
            }
        }

        if (this.x < 0) {
            this.playerTwo.score++;
            this.x = (800 - 20) / 2;
            this.y = (400 - 20) / 2;
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.speed = 2;
        }
        if (this.x > 800) {
            this.playerOne.score++;
            this.x = (800 - 20) / 2;
            this.y = (400 - 20) / 2;
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
            this.speed = 2;
        }

    },
    collide: function(b) {


        return this.collideX < b.x + b.width &&
            this.collideX + this.collideWidth > b.x &&
            this.collideY < b.y + b.height &&
            this.collideY + this.collideHeight > b.y;
    }


}