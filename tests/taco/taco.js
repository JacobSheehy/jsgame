(function() {
  var loop, opts, randomInt, game;
  game = jsgame();

  var rect = game.buildObject("rect");
  rect.x = 50;
  rect.y = 50;
  rect.w = 30;
  rect.h = 30;

  loop = function () {
    // Clear the canvas
    game.clear();
    
    // Process events
    for(var i = 0; i<game.events.length; i++) {
      var e = game.events[i].keyCode;
      if(e==game.KEYS.W) {
        rect.y-=1;
      }
      if(e==game.KEYS.A) {
        rect.x-=1;
      }
      if(e==game.KEYS.S) {
        rect.y+=1;
      }
      if(e==game.KEYS.D) {
        rect.x+=1;
      }
    }
    
    // draw my rectangle
    game.drawObject(rect);
  };

  opts = {
    framerate : 60
  };

  game.init("taco", loop, opts);
}());

