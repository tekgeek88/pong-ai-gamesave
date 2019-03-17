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