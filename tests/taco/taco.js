(function() {
  var loop, opts, randomInt, game;
  game = jsgame();

  var rect = game.buildObject("rect");
  rect.x = 50;
  rect.y = 50;
  rect.w = 30;
  rect.h = 30;
  rect.dir_x = 1;
  rect.dir_y = 0;
  rect.speed = 5;
  rect.move = function () {
    this.x += this.dir_x * this.speed;
    this.y += this.dir_y * this.speed;
  };

  var alive = true;

  loop = function () {
    var player;
    if (alive && game.objectExists("player") === false) {
      game.addObject(rect, "player");
    }
    
    // Process events
    if (game.objectExists("player") === true) {
      player = game.getObject("player");
      for(var i = 0; i < game.events.length; i++) {
        var e = game.events[i].keyCode;
        var speed = 5;
        if(e === game.KEYS.W) {
          player.dir_y = -1;
          player.dir_x = 0;
        }
        if(e === game.KEYS.A) {
          player.dir_x = -1;
          player.dir_y = 0;
        }
        if(e === game.KEYS.S) {
          player.dir_y = 1;
          player.dir_x = 0;
        }
        if(e === game.KEYS.D) {
          player.dir_x = 1;
          player.dir_y = 0;
        }
        if (e === game.KEYS.X) {
          game.removeObject("player");
          alive = false; // don't recreate it at the beginning
        }
      }
      player.move();
    }
  };

  opts = {
    framerate : 60
  };

  game.init("taco", loop, opts);
}());

