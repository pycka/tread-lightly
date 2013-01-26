define(['net', 'display', 'input', 'loop', 'world'],
  function (net, display, input, loop, world) {

  var server = {
    addr: 'treadlightly',
    port: 8085
  };

  input.connect();
  display.connect(document.getElementsByTagName('canvas')[0]);
  // net.connect(server, onConnect);
  onConnect();

  function onConnect() {
    world.setMap(0);
    loop.start(); // temporary
  }

});