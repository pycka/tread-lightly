define(['display', 'input', 'net'], function (display, input, net) {
  var loop = {
    run: false,

    start: function () {
      while (this.run) {
        input.update();
      }
    },

    stop: function () {

    }
  };

  return loop;
});