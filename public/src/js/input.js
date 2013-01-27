define(['const'], function (constants) {
  var input = {
    keys:  0,

    connect: function () {
      $(window).keydown(this.update);
    },

    update: function (event) {
      switch (event.which) {
        case 65:
        case 97:
          input.keys |= constants.KEY_LEFT;
          break;

        case 68:
        case 100:
          input.keys |= constants.KEY_RIGHT;
          break;

        case 87:
        case 119:
          input.keys |= constants.KEY_UP;
          break;

        case 83:
        case 115:
          input.keys |= constants.KEY_DOWN;
          break;

      }
    },
    
    getKeys: function () {
      var keys = this.keys;
      this.keys = 0;

      return keys;
    }
  };

  return input;
});