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
    var visibleCanvas;
    var visibleContext;
    var g; // main objct
    var gopts; // framerate, size={width,height} 
    var loopWrapper; // Timing
    
    // Define basic physical objects
    var gameObj = function(type)  {
      var x = 0;
      var y = 0; 
      var w = 0;
      var h = 0;
      var type=type;
    };
    
    // g and gopts are objects
    g = {};
    gopts = {};
    
    g.events = []; // Deliver input events
    
    // Input maps
    g.KEYS = {
      A:65,
      S:83,
      W:87,
      D:68
    };
    
    // Call the game's loop according to framerate
    loopWrapper = function (loopFun) {
      var nextCycle = 1000 / gopts.framerate;
      setInterval(
        (function() {
          refresh();
          loopFun();
          cleanup();
        }), 
        nextCycle
      );
    };
    
    // Clear the event list
    var cleanup = function() {
      g.events = [];
    }
    
    // clear and re-paint the visible canvas
    var refresh = function() {
      visibleContext.clearRect(0, 0, gopts.size.width, gopts.size.height);
      visibleContext.drawImage(canvas, 0, 0);
    };
    
    // Create a physical object
    g.buildObject = function(type) {
      var o = new gameObj();
      o.type=type;
      return o;
    };
    
    // Objects store their own location, so draw the passed object
    g.drawObject = function(obj) {
      if(obj.type=="rect") {
        context.fillRect(obj.x, obj.y, obj.w, obj.h);
      }
    }
    g.clear = function() {
      // Clear the hidden context
      context.clearRect(0,0,gopts.size.width,gopts.size.height);
    };

    g.print = function(text) {
      context.font = "bold 12px sans-serif";
      context.fillText(text, 10, 10);  
    };
    
    g.printText = function (text, x, y, font) {
      var previousFont = context.font;
      if (typeof font !== "undefined") {
        context.font = font;
      }
      context.fillText(text, x, y);
      context.font = previousFont;
    };
    
    var registerEvent = function(evt) {
      g.events.push(evt);
    };
    
    // Initialize library
    g.init = function(canvasId, loopFun, opts) {
      var previousOnload = window.onload;
      window.onload = function (event) {
        if (typeof previousOnload === "function") {
          previousOnload(event);
        }
        // Initialize canvas elements
        visibleCanvas = document.getElementById(canvasId);
        visibleContext = visibleCanvas.getContext("2d");
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        // Size is specified either in gopts
        // or in the canvasId DOM element
        if(opts.hasOwnProperty("size")) {
          gopts.size = opts.size;
        } else {
          gopts.size = {
            width: visibleCanvas.width,
            height: visibleCanvas.height
          };
        }
        canvas.width = gopts.size.width;
        canvas.height = gopts.size.height;
        gopts.framerate = opts.framerate;
        
        // Capture input events
        document.onkeydown = function(evt) {
          registerEvent(evt);
        };
        document.onkeyup = function(evt) {
          registerEvent(evt);
        };
        document.onclick = function(evt) {
          registerEvent(evt);
        };
        document.onmousedown = function(evt) {
          registerEvent(evt);
        };
        document.onmouseup = function(evt) {
          registerEvent(evt);
        };
        document.onbdlclick = function(evt) {
          registerEvent(evt);
        };        
        
        // Begin game loop
        loopWrapper(loopFun);
      };
    };
    return g;
  } () ;
  window.jsgame = jsgame;
}());
