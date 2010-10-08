(function() {
  var loop, opts, randomInt;

  loop = function () {
    jsgame.clear();
    var tx, ty;
    jsgame.print("Hello, world");
    tx = Math.floor(randomInt(4, 300));
    ty = Math.floor(randomInt(4, 300));
    jsgame.printText("Hello, world", tx, ty);
  };

  randomInt = function (min, max) {
    return Math.random() * (max-min) + min;
  };

  opts = {
    framerate : 10
  };

  jsgame.init("burrito", loop, opts);
}());

