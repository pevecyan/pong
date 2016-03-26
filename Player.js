function Player(id) {
    this.width = 20;
    this.height = 70;

    this.score = 0;

    this.id = id;
    if (id == 1) {
        this.x = 50;
        this.y = (400 - this.height) / 2
    } else if (id == 2) {
        this.x = 800 - this.width - 50;
        this.y = (400 - this.height) / 2
    }
}
Player.prototype = {
    constrctor: Player,
    draw: function(context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.x, this.y, this.width, this.height);
    },
    move: function(x, y) {
        //this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        if (this.y < 0) {
            this.y = 0;

        }
        if (this.y > 400 - this.height) {
            this.y = 400 - this.height;
        }
    }
}