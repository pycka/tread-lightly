define(['display', 'input', 'data', 'logic'], function (display, input, data, logic) {
  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || 
                              window.msRequestAnimationFrame;
  var cancelAnimationFrame =  window.cancelAnimationFrame ||
                              window.mozCancelAnimationFrame ||
                              window.webkitCancelAnimationFrame ||
                              window.webkitCancelRequestAnimationFrame ||
                              window.msCancelAnimationFrame;

  var loop = {
    run:       false,
    requestId: null,
    world:     null, 
    startTime: null,

    start: function () {
      this.run       = true;
      this.world     = data.world.boxWorld;
      this.startTime = this.now();
      this.step();
    },

    stop: function () {
      this.run = false;
      this.requestId && cancelAnimationFrame(this.requestId);
    },

    step: function step() {
      var world = loop.world;
      if (loop.run) {
        logic.checkInput();
        world.Step(1/60, 8, 4);
        logic.checkWorld();
        display.draw(world);

        requestAnimationFrame(step);
        world.ClearForces();
      }
    },

    // not much used yet
    now: (function () {
      return Date.now ? Date.now : function () {
        return new Date().getTime();
      };
    })()
  };

  return loop;
});