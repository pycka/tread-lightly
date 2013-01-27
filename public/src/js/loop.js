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
      this.world     = data.world;
      this.startTime = this.now();
      this.step();
    },

    stop: function () {
      this.run = false;
      input.clear();
      this.requestId && cancelAnimationFrame(this.requestId);
    },

    step: function step() {
      var world = loop.world;
      logic.checkInput();
      if (loop.run) {
        world.boxWorld.Step(1/60, 8, 4);
        logic.checkWorld(loop);
        display.draw(world);

        requestAnimationFrame(step);
        world.boxWorld.ClearForces();
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