define(['net', 'display', 'input', 'loop', 'data', 'components/World'],
  function (net, display, input, loop, data, World) {

  var server = {
    addr: 'treadlightly',
    port: 8085
  };

  // Initialize.
  input.connect();
  display.connect(document.getElementById('canvas'));

  // Play (should defer until server connection is up if co-op implemented).
  onReady();

  function onReady() {
    var map = data.maps[0]();

    data.world = new World();
    data.world.loadMap(map);
    data.world.start();

    loop.start(); // temporary
  }

});