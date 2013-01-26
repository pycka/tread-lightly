define(['components/Map', '/lib/js/box2d.js'], function (Map) {
  var WORLD_SIZE = 50;

  var maps = {
    0: function () {
      var map = new Map();
      map.addWall(20, 1, 2, 2);
      map.setStartPoint(1, 1);
      map.setFinishPoint(49, 49);
      return map;
    }
  };


  return {
    map: null,
    b2: {
      world:   null,
      objects: [],

      genBorders: function () {
        var b2Vec2 = Box2D.Common.Math.b2Vec2;
        var borderDef = new Box2D.Dynamics.b2BodyDef();
        borderDef.position.Set(0, 0);
        var borderBody = this.world.CreateBody(borderDef);

        var vec0 = new b2Vec2(0, 0);
        var vec1 = new b2Vec2(WORLD_SIZE, 0);
        var vec2 = new b2Vec2(WORLD_SIZE, WORLD_SIZE);
        var vec3 = new b2Vec2(0, WORLD_SIZE);
        var borderFixDef = new Box2D.Dynamics.b2FixtureDef();
        borderFixDef.restitution = 1;
        borderFixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        borderFixDef.shape.SetAsEdge(vec0, vec1);
        borderBody.CreateFixture(borderFixDef, 0);
        borderFixDef.shape.SetAsEdge(vec1, vec2);
        borderBody.CreateFixture(borderFixDef, 0);
        borderFixDef.shape.SetAsEdge(vec2, vec3);
        borderBody.CreateFixture(borderFixDef, 0);
        borderFixDef.shape.SetAsEdge(vec0, vec3);
        borderBody.CreateFixture(borderFixDef, 0);
      },

      genWalls: function (walls) {
        for (var i = 0, size = walls.length ; i < size ; ++i) {
          var wall = walls[i];
          var wallBodyDef = new Box2D.Dynamics.b2BodyDef();
          wallBodyDef.position.Set(wall.x, wall.y);
          var wallBody = this.world.CreateBody(wallBodyDef);
          var wallFixDef = new Box2D.Dynamics.b2FixtureDef();
          wallFixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
          wallFixDef.shape.SetAsBox(wall.width / 2, wall.height / 2);
          wallBody.CreateFixture(wallFixDef);
        }
      },

      genZombies: function () {

      },

      genFinishPoint: function () {

      }
    },

    // @private
    initWorld: function () {
      var b2Vec2 = Box2D.Common.Math.b2Vec2;
      var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
      var world = this.b2.world = new Box2D.Dynamics.b2World(new b2Vec2(0, 0), false);

      this.b2.genBorders();
      this.b2.genWalls(this.map.walls);

      var zombieBodyDef = new Box2D.Dynamics.b2BodyDef();
      zombieBodyDef.position.Set(25, 25);
      zombieBodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
      var zombieBody = world.CreateBody(zombieBodyDef);
      var zombieFixDef = new Box2D.Dynamics.b2FixtureDef();
      zombieFixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(1);
      zombieBody.CreateFixture(zombieFixDef);
      zombieBody.SetLinearVelocity(new b2Vec2(10, 10));

      window.canvas.addEventListener('click', function () {
        zombieBody.SetLinearDamping(1.5);
        zombieBody.SetLinearVelocity(new b2Vec2((Math.random()-0.5)*40, (Math.random()-0.5)*40));
      }, false);

//setup debug draw
      var debugDraw = new b2DebugDraw();
      debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
      debugDraw.SetDrawScale(10.0);
      debugDraw.SetFillAlpha(1);
      debugDraw.SetLineThickness(2.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      world.SetDebugDraw(debugDraw);

      window.setInterval(update, 1000 / 60);

      function update() {
        world.Step(1 / 60, 10, 10);
        world.DrawDebugData();
        world.ClearForces();
     };
    },

    // @public
    setMap: function (id) {
      this.map = maps[id]();
      this.initWorld();
    }
  };
});