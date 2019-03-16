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
save.onclick = function() {
  save.innerHTML = "Saved";
  console.log("saved");
  socket.emit("save", {studentname:"Carl Argabright", statename:"Pong", data:"Carls Pong Game" });
  console.log(board);
}

var load = document.getElementById('load');
load.onclick = function() {
   load.innerHTML = "Loaded.";
   socket.emit("load", {studentname: "Carl Argabright", statename: "Pong"});
  
   socket.on("load", function(data) {
     console.log(data.data);
     Game.draw();
   });
   Game.start();
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