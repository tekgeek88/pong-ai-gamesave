function Paddle(game) {
    Entity.call(this);
    this.game = game;

    this.width = 20;
    this.height = 100;
    this.score = 0;
    this.speed = 10;

    // Center the paddle vertically
    this.y = game.height / 2 - this.height;
}

Paddle.prototype = Object.create(Entity.prototype);
Paddle.prototype.constructor = Paddle;

Paddle.prototype.update = function() {
    Entity.prototype.update.apply(this, arguments);

    // y will always stay bellow or equal to 0
    // This keeps the paddle on the screen
    this.y = Math.min(Math.max(this.y, 0), this.game.height - this.height);
}