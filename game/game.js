var socket = io.connect("http://24.16.255.56:8888");

function Game(canvas) {
  var that = this;
  this.canvas = canvas;
  this.width = canvas.offsetWidth;
  this.height = canvas.offsetHeight;

  this.keyPressed = {};

  document.addEventListener("keydown", function (e) {
    handleEvent(e);
  });

  document.addEventListener("keyup", function (e) {
    handleEvent(e);
  });

  function handleEvent(e) {
    var keyName = Game.keys[e.which];
    if (keyName) {
      e.preventDefault();
      that.keyPressed[keyName] = (e.type === "keydown");
    }
  }

  var save = document.getElementById('save');

  if (null !== save) {
    save.onclick = function() {
      save.innerHTML = "Saved";
      console.log("saved");

      let gameData = that.entities[0];

      // let data = [];
      // data.push(that.entities[0]);
      // data.push(that.entities[1]);
      // data.push(that.entities[2]);
      // data.push(that.entities[3]);
      // data[0].game = null;
      // data[1].game = null;
      // data[2].game = null;
      // data[3].game = null;

      // let shit = JSON.stringify(gameData);
      let saveData = JSON.stringify( that.entities, function( key, value) {
        if( key == 'game') {
          return value.id;}
        else {
          return value;}
      });





      socket.emit("save", {studentname:"Carl Argabright", statename:"Pong", data:saveData });
      console.log(game.entities);

    }
  }


  var load = document.getElementById('load');

  if (null !== load) {
    load.onclick = function() {
      load.innerHTML = "Loaded.";
      socket.emit("load", {studentname: "Carl Argabright", statename: "Pong"});

      socket.on("load", function(data) {
        console.log(data.data);
        console.log(JSON.parse(data.data));
        // that.entities = data.data;

        // let result =

        var player = Object.create(JSON.parse(data.data)[0]);
        var bot = Object.create(JSON.parse(data.data)[1]);
        var ball = Object.create(JSON.parse(data.data)[2]);
        var score = Object.create(JSON.parse(data.data)[3]);

        game.entities[0].height = player.height;
        game.entities[0].score = player.score;
        game.entities[0].speed = player.speed;
        game.entities[0].y = player.y;
        game.entities[0].yVelocity = player.yVelocity;


        game.entities[1].height = bot.height;
        game.entities[1].score = bot.score;
        game.entities[1].speed = bot.speed;
        game.entities[1].y = bot.y;
        game.entities[1].yVelocity = bot.yVelocity;


        game.entities[2].height = ball.height;
        game.entities[2].x = ball.x;
        game.entities[2].y = ball.y;
        game.entities[2].xVelocity = 5;
        game.entities[2].yVelocity = 5;

        game.draw();
      });
      game.start();
    }
  }
}





Game.keys = {
  // Which?  38 or 40?
  38: 'up',
  40: 'down'
}



Game.prototype.start = function() {
  var that = this;
  (function loop() {
    window.requestAnimationFrame(loop);
    that.update();
    that.draw();
  }());
}

Game.prototype.update = function () {
  this.entities.forEach(entity => {
    if (entity.update) {
      entity.update();
    }
  });
}

Game.prototype.draw = function () {
  this.entities.forEach(entity => {
    if (entity.draw ) {
      entity.draw();
    }
  });
}