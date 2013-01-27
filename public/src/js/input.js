define(['const'], function (constants) {
  var input = {
    keys:  0,

    connect: function () {
      $(window).keydown(this.recordKey);
      $(window).keyup(this.releaseKey)
    },

    recordKey: function (event) {
      var keyCode = event.which;

      if (constants.KEY_UP_CODES[keyCode]) {
        input.keys |= constants.KEY_UP;
      }
      else if (constants.KEY_DOWN_CODES[keyCode]) {
        input.keys |= constants.KEY_DOWN;
      }
      if (constants.KEY_LEFT_CODES[keyCode]) {
        input.keys |= constants.KEY_LEFT;
      }
      else if (constants.KEY_RIGHT_CODES[keyCode]) {
        input.keys |= constants.KEY_RIGHT;
      }
    },

    releaseKey: function (event) {
      var keyCode = event.which;

      if (constants.KEY_UP_CODES[keyCode]) {
        input.keys &= ~constants.KEY_UP;
      }
      else if (constants.KEY_DOWN_CODES[keyCode]) {
        input.keys &= ~constants.KEY_DOWN;
      }
      if (constants.KEY_LEFT_CODES[keyCode]) {
        input.keys &= ~constants.KEY_LEFT;
      }
      else if (constants.KEY_RIGHT_CODES[keyCode]) {
        input.keys &= ~constants.KEY_RIGHT;
      }
    },
    
    getKeys: function () {
      return this.keys;
    }
  };

  return input;
});