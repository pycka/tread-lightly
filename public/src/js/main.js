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
    var mapId = 0;
    var map = data.maps[mapId]();
    map.setId(mapId);

    data.world = new World();
    data.world.loadMap(map);
    data.world.start();

    loop.start(); // temporary
  }

});