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
    var currentObjects;
    
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
      D:68,
      X:88
    };
    
    // Call the game's loop according to framerate
    loopWrapper = function (loopFun) {
      var nextCycle = 1000 / gopts.framerate;
      setInterval(
        (function() {
          g.clear();
          renderObjects();
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
    };
    
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

    var renderObjects = function () {
        var id;
        for (id in currentObjects) {
            g.drawObject(currentObjects[id]);
        }
    };

    g.objectExists = function (id) {
        if (typeof currentObjects[id] === "undefined") {
            return false;
        } else {
            return true;
        }
    };

    g.addObject = function (obj, id) {
        var newObj = {};
        var i;
        //copy the object
        for (i in obj) {
            newObj[i] = obj[i];
        }
        currentObjects[id] = newObj;
    };

    g.removeObject = function (id) {
        delete currentObjects[id];
    };

    g.getObject = function (id) {
        if (currentObjects.hasOwnProperty(id) === true) {
            return currentObjects[id];
        } else {
            throw "Object" + id + " does not exist.";
        }
    };
    
    // Objects store their own location, so draw the passed object
    g.drawObject = function(obj) {
      if(obj.type=="rect") {
        context.fillRect(obj.x, obj.y, obj.w, obj.h);
      } else {
        obj.draw();
      }
    }
    g.clear = function() {
      // Clear the hidden context
      context.clearRect(0,0,gopts.size.width,gopts.size.height);
    };

    g.print = (function () {
      var lineNumber = 0;
      var fontSize = 12;
      var numberOfLines = 10;
      return function(text) {
        var textObject = g.buildObject();
        textObject.x = 10;
        textObject.y = lineNumber * fontSize + fontSize;
        textObject.text = text;
        textObject.draw = function () {
          context.font = fontSize + "px sans-serif";
          context.fillText(this.text, this.x, this.y);  
        };
        g.addObject(textObject, "_jsgame_pt_line_" + lineNumber);
        lineNumber += 1;
        //TODO make this work like a terminal
      };
    }());
    
    g.printText = function (text, x, y, font) {
      var textObject, guid;
      guid = "_jsgame_textobj_" + parseInt(Math.random() * 1000000, '.');
      textObject = g.buildObject();
      textObject.x = x;
      textObject.y = y;
      textObject.text = text;
      textObject.draw = function () {
        //don't tamper with context.font (but still use the given font if possible)
        var previousFont = context.font;
        if (typeof font !== "undefined") {
            context.font = font;
        }
        context.fillText(this.text, this.x, this.y);
        context.font = previousFont;
      };
      g.addObject(textObject, guid);

      return g.getObject(guid);
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
        currentObjects = {};
        
        // Begin game loop
        loopWrapper(loopFun);
      };
    };
    return g;
  };
  window.jsgame = jsgame;
}());
