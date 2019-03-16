var canvas = document.getElementById("game");
    game = new Game(canvas);


game.entities = [
    game.player = new Player(game),
    game.bot = new Bot(game),
    game.ball = new Ball(game),
    game.score = new Score(game)
];


// Start the game loop
game.start();
canvas.focus();
