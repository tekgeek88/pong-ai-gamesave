function Ball(game) {
    Entity.call(this, game);
    this.x = 10;
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.xVelocity = 5;
    this.yVelocity = 5;
    this.name = "ball";

    // Create a new DOM element
    let player = document.createElement("div");
    player.style.position = "absolute";
    // Set the CSS styles
    player.style.width = this.width + 'px';
    player.style.height = this.height + 'px';

    player.style.left = this.x + 'px';
    player.style.top = this.y + 'px';

    // Set the players id
    player.setAttribute("id", "ball");

    // Then store the player inside the player class
    this.player = player;

    // Now we need to attach the player to the DOM
    game.canvas.append(player);
}

Ball.prototype = Object.create(Entity.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
    let ball = this.player;
    ball.style.left = this.x + 'px';
    ball.style.top = this.y + 'px';
}

 
Ball.prototype.reset = function() {
    this.x = this.game.width / 2 - this. width;
    this.y = this.game.height / 2 - this.height;

    let min = -5, max = 5;

    this.yVelocity = Math.floor(Math.random() * (max - min + 1) + min);
    this.xVelocity = Math.random() > 0.5 ? 5 : -5; // 50% chance of choosing left or right to start from
    
}


Ball.prototype.update = function() {
    Entity.prototype.update.apply(this, arguments); // Call update in the parent
    
    // If the ball hits the top or bottom of the screen
    if (this.y > this.game.height - this.height || this.y < 0) {
        this.yVelocity *= -1;  // Switch the direction of the ball
    }

    // If the ball goes off the screen on the RIGHT side the player gains a point
    if (this.x > this.game.width) {
        this.game.player.score += 1;
        this.reset();
    }

    // If the ball goes off the screen on the LEFT side the bot gains a point
    if (this.x < 0) {
        this.game.bot.score += 1;
        this.reset();
    }

    let hitter;
    if(this.intersect(this.game.bot)) {
        hitter = this.game.bot;
    } else if (this.intersect(this.game.player)) {
        hitter = this.game.player;
    }  

    if (hitter) {
        this.xVelocity *= -1.1;
        this.yVelocity *= -1.1;

        // Increases veolocity as the game is played
        this.yVelocity += hitter.yVelocity / 2;
    }

    console.log("this.xVelocity: " + this.xVelocity);
    console.log("this.yVelocity: " + this.yVelocity);
}