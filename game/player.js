function Player(game) {
    Paddle.call(this, game);
    this.game = game;

    this.x = 20;
    this.name = "player"; 

    // Create a new DOM element
    let player = document.createElement("div");
    player.style.position = "absolute";
    // Set the CSS styles
    player.style.width = this.width + 'px';
    player.style.height = this.height + 'px';

    player.style.left = this.x + 'px';
    player.style.top = this.y + 'px';

    // Set the players id
    player.setAttribute("id", "player");

    // Then store the player inside the player class
    this.player = player;

    // Now we need to attach the player to the DOM
    game.canvas.append(player);
}

Player.prototype = Object.create(Paddle.prototype);
Player.prototype.constructor = Player;

Player.prototype.draw = function() {
    let player = this.player;
    player.style.left = this.x + 'px';
    player.style.top = this.y + 'px';
     
}

Player.prototype.update = function() {
    var that = this;
    var speed = 10;
    if (that.game.keyPressed.up) {
        that.yVelocity = -speed;
    } else if (that.game.keyPressed.down) {
        that.yVelocity = speed;
    } else {
        // Stop the player from moving.
        that.yVelocity = 0;
    }

    Paddle.prototype.update.apply(that, arguments);
}
