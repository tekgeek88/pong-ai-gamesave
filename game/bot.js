function Bot(game) {
    this.game = game;
    Paddle.call(this, game);
    this.name = "bot";
    this.speed = 5;

    this.x = game.width - this.width - 20;


    // Create a new DOM element
    let bot = document.createElement("div");
    bot.style.position = "absolute";
    // Set the CSS styles
    bot.style.width = this.width + 'px';
    bot.style.height = this.height + 'px';

    bot.style.left = this.x + 'px';
    player.style.top = this.y + 'px';
    bot
    // Set the players id
    bot.setAttribute("id", "bot");

    // Then store the player inside the player class
    this.player = bot;

    // Now we need to attach the player to the DOM
    game.canvas.append(bot);
}

Bot.prototype = Object.create(Paddle.prototype);
Bot.prototype.constructor = Bot;

Bot.prototype.draw = function() {
    let bot = this.player;
    bot.style.left = this.x + 'px';
    bot.style.top = this.y + 'px';
}

Bot.prototype.update = function () {
    let that = this;

    // Bot will follow the boll
    if (that.y < that.game.ball.y) {
        that.yVelocity = that.speed;
    } else if (that.y > that.game.ball.y) {
        that.yVelocity = -that.speed;
    }

    Paddle.prototype.update.apply(this, arguments);
}