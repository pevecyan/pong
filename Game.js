var game;

function bodyLoaded() {
    var canvas = document.getElementById('gameCanvas');



    game = new Game(canvas);

    canvas.addEventListener('touchmove', function(event) {
        event.preventDefault();
        if (event.targetTouches.length > 0) {
            for (var i = 0; i < event.targetTouches.length; i++) {
                var touch = event.targetTouches[i];
                if (touch.pageX < 400) {
                    game.playerOne.move(touch.pageX, touch.pageY);
                } else {
                    game.playerTwo.move(touch.pageX, touch.pageY);
                }
            }


        }
    }, false);

}



function Game(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");



    //Time manage
    this.startTime = null;
    this.currentTime = 0;
    this.previusTime = 0;

    //
    this.width = 800;
    this.height = 400;



    this.playerOne = new Player(1);
    this.playerTwo = new Player(2);


    this.ball = new Ball(this.playerOne, this.playerTwo);

    requestAnimationFrame(this.gameLoop.bind(this));
}

function drawNumber(x, y, number, context) {
    context.fillStyle = "#FFFFFF";
    if (number == 0) {
        context.fillRect(x, y, 5, 40);
        context.fillRect(x, y, 20, 5);
        context.fillRect(x + 15, y, 5, 40);
        context.fillRect(x, y + 35, 20, 5);
    } else if (number == 1) {
        context.fillRect(x + 7, y, 5, 40);

    } else if (number == 2) {
        context.fillRect(x + 15, y, 5, 20);
        context.fillRect(x, y, 20, 5);
        context.fillRect(x, y + 17, 20, 5);
        context.fillRect(x, y + 17, 5, 20);
        context.fillRect(x, y + 35, 20, 5);
    } else if (number == 3) {
        context.fillRect(x + 15, y, 5, 20);
        context.fillRect(x, y, 20, 5);
        context.fillRect(x, y + 17, 20, 5);
        context.fillRect(x + 15, y + 17, 5, 20);
        context.fillRect(x, y + 35, 20, 5);
    } else if (number == 4) {
        context.fillRect(x, y, 5, 20);
        context.fillRect(x + 15, y, 5, 20);
        context.fillRect(x, y + 17, 20, 5);
        context.fillRect(x + 15, y + 17, 5, 20);

    } else if (number == 5) {
        context.fillRect(x, y, 5, 20);
        context.fillRect(x, y, 20, 5);
        context.fillRect(x, y + 17, 20, 5);
        context.fillRect(x + 15, y + 17, 5, 20);
        context.fillRect(x, y + 35, 20, 5);
    } else if (number == 6) {
        context.fillRect(x, y, 5, 20);
        context.fillRect(x, y, 20, 5);
        context.fillRect(x, y + 17, 5, 20);
        context.fillRect(x, y + 17, 20, 5);
        context.fillRect(x + 15, y + 17, 5, 20);
        context.fillRect(x, y + 35, 20, 5);
    } else if (number == 7) {

        context.fillRect(x, y, 20, 5);
        context.fillRect(x + 15, y, 5, 40);

    } else if (number == 8) {
        context.fillRect(x, y, 5, 20);
        context.fillRect(x, y, 20, 5);
        context.fillRect(x + 15, y, 5, 20);
        context.fillRect(x, y + 17, 5, 20);
        context.fillRect(x, y + 17, 20, 5);
        context.fillRect(x + 15, y + 17, 5, 20);
        context.fillRect(x, y + 35, 20, 5);
    } else if (number == 9) {
        context.fillRect(x, y, 5, 20);
        context.fillRect(x, y, 20, 5);
        context.fillRect(x + 15, y, 5, 20);
        context.fillRect(x, y + 17, 20, 5);
        context.fillRect(x + 15, y + 17, 5, 20);
        context.fillRect(x, y + 35, 20, 5);
    }

}

Game.prototype = {
    constructor: Game,

    resize: function(width, height) {

        this.context.scale(width / 800, height / 400);
    },
    draw: function() {
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.fillStyle = "#FFFFFF";
        this.context.fillRect((this.width - 10) / 2, 20, 10, this.height - 40);

        this.playerOne.draw(this.context);
        this.playerTwo.draw(this.context);

        this.ball.draw(this.context);

        //Player one score

        var length = (this.playerOne.score + "").length;
        for (var i = 0; i < length; i++) {
            //alert((this.playerOne.score + "").charAt(length - 1 - i));
            drawNumber(this.width / 2 - 50 - i * 30, 30, (this.playerOne.score + "").charAt(length - 1 - i), this.context);
        }
        //Player two score

        var length = (this.playerTwo.score + "").length;
        for (var i = 0; i < length; i++) {
            //alert((this.playerTwo.score + "").charAt(length - 1 - i));
            drawNumber(this.width / 2 + 30 + i * 30, 30, (this.playerTwo.score + "").charAt(i), this.context);
        }
    },
    update: function() {
        this.ball.update(this.currentTime - this.previusTime);
    },
    gameLoop: function(gameTime) {
        if (this.startTime == null) {
            this.startTime = gameTime;
        }
        this.currentTime = gameTime - this.startTime;
        this.update();
        this.draw();

        this.previusTime = this.currentTime;
        requestAnimationFrame(this.gameLoop.bind(this));

    }

}

function resizeCanvas() {
    CANVAS_WIDTH = window.innerWidth;
    //CANVAS_HEIGHT = window.innerHeight;

    CANVAS_HEIGHT = CANVAS_WIDTH / 2;
    if (CANVAS_HEIGHT > window.innerHeight) {
        CANVAS_WIDTH = window.innerHeight * 2;
        CANVAS_HEIGHT = window.innerHeight;
    }
    console.log(CANVAS_WIDTH);

    document.getElementById('gameCanvas').setAttribute('width', CANVAS_WIDTH);
    document.getElementById('gameCanvas').setAttribute('height', CANVAS_HEIGHT);

    game.resize(CANVAS_WIDTH, CANVAS_HEIGHT);



}