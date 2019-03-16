class Score {
    constructor(game) {
        this.game = game;
        this.score_player1 = document.getElementById("score_player1");
        this.score_player2 = document.getElementById("score_player2");
    }
    draw() {
        this.score_player1.innerHTML = "PLAYER 1: " + this.game.player.score;
        this.score_player2.innerHTML = "BOT: " + this.game.bot.score;
    }
}

