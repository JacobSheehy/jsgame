(function() {
  var loop, opts, randomInt;

  var rect = jsgame.buildObject("rect");
  rect.x = 50;
  rect.y = 50;
  rect.w = 30;
  rect.h = 30;

  loop = function () {
    jsgame.clear();
    jsgame.drawObject(rect);
    rect.x+=2;
  };

  opts = {
    framerate : 8
  };

  jsgame.init("taco", loop, opts);
}());

