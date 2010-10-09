(function() {
  var loop, opts, randomInt;

  var rect = jsgame.buildObject("rect");
  rect.x = 50;
  rect.y = 50;
  rect.w = 30;
  rect.h = 30;

  loop = function () {
    // Clear the canvas
    jsgame.clear();
    
    // Process events
    for(var i = 0; i<jsgame.events.length; i++) {
      var e = jsgame.events[i].keyCode;
      if(e==jsgame.KEYS.W) {
        rect.y-=1;
      }
      if(e==jsgame.KEYS.A) {
        rect.x-=1;
      }
      if(e==jsgame.KEYS.S) {
        rect.y+=1;
      }
      if(e==jsgame.KEYS.D) {
        rect.x+=1;
      }
    }
    
    // draw my rectangle
    jsgame.drawObject(rect);
  };

  opts = {
    framerate : 60
  };

  jsgame.init("taco", loop, opts);
}());

