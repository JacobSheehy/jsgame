(function() {
  var loop, opts, randomInt, game;
  game = jsgame();

  var rect = game.buildObject("rect");
  rect.x = 50;
  rect.y = 50;
  rect.w = 30;
  rect.h = 30;

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
          player.y -= speed;
        }
        if(e === game.KEYS.A) {
          player.x -= speed;
        }
        if(e === game.KEYS.S) {
          player.y += speed;
        }
        if(e === game.KEYS.D) {
          player.x += speed;
        }
        if (e === game.KEYS.X) {
          game.removeObject("player");
          alive = false; // don't recreate it at the beginning
        }
      }
    }
  };

  opts = {
    framerate : 60
  };

  game.init("taco", loop, opts);
}());

