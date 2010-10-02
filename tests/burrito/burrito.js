(function() {
  var loop, opts, randomInt;

  loop = function () {
    var tx, ty;
    jsgame.print("Hello, world");
    tx = Math.floor(randomInt(4, 300));
    ty = Math.floor(randomInt(4, 300));
    jsgame.printText("Yo dawg", tx, ty);
  };

  randomInt = function (min, max) {
    return Math.random() * (max-min) + min;
  };

  opts = {
    framerate : 2
  };

  jsgame.init("burrito", loop, opts);
}());

