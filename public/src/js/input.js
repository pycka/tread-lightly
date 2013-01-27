define(function () {
  var KEY_UP      = 1;
  var KEY_DOWN    = 2;
  var KEY_LEFT    = 4;
  var KEY_RIGHT   = 8;
  var MOUSE_CLICK = 16;

  var input = {
    // mx, my, button map
    state: [0, 0, 0],

    connect: function () {
      $(window).keydown(this.update);
    },

    update: function (event) {
      console.log(event);
    },
    
  };

  return input;
});