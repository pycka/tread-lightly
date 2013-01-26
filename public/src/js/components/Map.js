define(function () {

  function Map() {
    this.walls = [];
    this.zombies = [];
    this.finishPoint = { x: 0, y: 0 };
    this.startPoint = { x: 0, y: 0 };
  };

  Map.prototype.addWall = function (width, height, x, y) {
    this.walls.push({
      width: width,
      height: height,
      x: x,
      y: y
    })
  };

  Map.prototype.addZombie = function (x, y, dir) {

  };

  Map.prototype.setStartPoint = function (x, y) {
    this.startPoint.x = x;
    this.startPoint.y = y;
  };

  Map.prototype.setFinishPoint = function (x, y) {
    this.finishPoint.x = x;
    this.finishPoint.y = y;
  };

  return Map;
});