var socket = io.connect("http://24.16.255.56:8888");
var canvas = document.getElementById("game");
var save = document.getElementById('save');

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

save.onclick = function() {
    save.innerHTML = "Saved";
    console.log("saved");
    let saveData = JSON.stringify( game.entities, function( key, value) {
        if( key == 'game') {
            return null;}
        else {
            return value;}
    });
    socket.emit("save", {studentname:"Carl Argabright", statename:"Pong", data:saveData });
}

var load = document.getElementById('load');
load.onclick = function() {
    load.innerHTML = "Loaded.";
    socket.emit("load", {studentname: "Carl Argabright", statename: "Pong"});

    socket.on("load", function(data) {
        console.log(data.data);
        restart(data.data);
    });
}

function restart(saveData) {
    var playerSave = Object.create(JSON.parse(saveData)[0]);
    var botSave = Object.create(JSON.parse(saveData)[1]);
    var ballSave = Object.create(JSON.parse(saveData)[2]);

    game.entities[0].y = playerSave.y;
    game.entities[0].score = playerSave.score;
    game.entities[1].y = botSave.y;
    game.entities[1].score = botSave.score;
    game.entities[2].x = ballSave.x;
    game.entities[2].y = ballSave.y;

}




