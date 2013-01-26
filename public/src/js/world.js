define(['/lib/js/box2d.js'], function () {

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

  var maps = {
    0: function () {
      var map = new Map();
      map.addWall(20, 1, 2, 2);
      map.setStartPoint(1, 1);
      map.setFinishPoint(49, 49);
      return map;
    }
  };

  var world = {
    map: null,
    b2: {
      world:  null,
      bodies: []
    },

    // @private
    initWorld: function () {
      this.b2.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 0), true);
    },

    // @public
    setMap: function (id) {
      this.map = maps[id]();
      this.initWorld();
    }
  };


  return world;
});