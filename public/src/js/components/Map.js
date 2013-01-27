define(['/lib/js/box2d.js'], function () {

  function Map() {
    this.walls   = [];
    this.zombies = [];
    this.finishPoint = { x: 0, y: 0 };
    this.startPoint = { x: 0, y: 0 };
  };

  Map.prototype.addWall = function (width, height, x, y) {
    this.walls.push({
      width:  width,
      height: height,
      x: x,
      y: y
    })
  };

  /**
   * @param {Number} x
   * @param {Number} y
   * @param {b2Vec2} v (optional, random by default)
   */
  Map.prototype.addZombie = function (x, y, v) {
    if (!v) {
      var xSpeed = Math.min((Math.random() - 0.5) * 8, 1);
      var ySpeed = Math.min((Math.random() - 0.5) * 8, 1);
      v = new Box2D.Common.Math.b2Vec2(xSpeed, ySpeed);
    }
    this.zombies.push({
      x: x,
      y: y,
      v: v,
      defaultV: v
    })
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