(function() {
  var loop, opts, randomInt, game;

  game = jsgame();
  var linenumber = 0;

  loop = function () {
    game.clear();
    var tx, ty;
    game.print("Hello, world" + (linenumber++));
    tx = Math.floor(randomInt(4, 300));
    ty = Math.floor(randomInt(4, 300));
    game.printText("Hello, world", tx, ty);
  };

  randomInt = function (min, max) {
    return Math.random() * (max-min) + min;
  };

  opts = {
    framerate : 2
  };

  game.init("burrito", loop, opts);
}());

