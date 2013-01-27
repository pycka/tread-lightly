define(function () {

  var display = {
    context: null,

    connect: function (canvasElement) {
      this.context = canvasElement.getContext('2d');
    },

    draw: function (world) {
      world.DrawDebugData();
    }
  };

  return display;
});