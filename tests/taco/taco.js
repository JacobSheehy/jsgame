(function() {
  var loop, opts, randomInt, game;
  game = jsgame();

  var rect = game.buildObject("rect");
  rect.x = 50;
  rect.y = 50;
  rect.w = 30;
  rect.h = 30;

  loop = function () {
    game.clear();
    game.drawObject(rect);
    rect.x+=2;
  };

  opts = {
    framerate : 8
  };

  game.init("taco", loop, opts);
}());

