/*
 * jsgame
 * 
 * A JavaScript game library for HTML5.
 * 
*/

(function () {
  var jsgame = function() {
    var canvas; // DOM Canvas element
    var context; // canvas's context
    var g; // main objct
    var gopts; // framerate, size={width,height} 
    var loopWrapper; // Timing 
    g = {};
    gopts = {};
    // Call the game's loop according to framerate
    loopWrapper = function (loopFun) {
      var nextCycle = 1000 / gopts.framerate;
      setInterval(loopFun, nextCycle);
    };
    g.print = function(text) {
      context.font = "bold 12px sans-serif";
      context.fillText(text,10,10);  
    };
    g.printText = function (text, x, y, font) {
      var previousFont = context.font;
      if (typeof font !== "undefined") {
        context.font = font;
      }
      context.fillText(text, x, y);
      context.font = previousFont;
    };
    g.init = function(canvasId, loopFun, opts) {
      var previousOnload = window.onload;
      window.onload = function (event) {
        if (typeof previousOnload === "function") {
          previousOnload(event);
        }
        canvas = document.getElementById(canvasId);
        context = canvas.getContext("2d");
        if(opts.hasOwnProperty("size")) {
          gopts.size = opts.size;
        } else {
          gopts.size = {
            width: canvas.width,
            height: canvas.height
          };
        }
        gopts.framerate = opts.framerate;
        loopWrapper(loopFun);
      };
    };
    return g;
  } () ;
  window.jsgame = jsgame;
}());
