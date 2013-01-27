define(['components/Actor', 'const', '/lib/js/box2d.js'], function (Actor, constants) {
  // Shortcuts
  var b2Vec2       = Box2D.Common.Math.b2Vec2;
  var b2BodyDef    = Box2D.Dynamics.b2BodyDef;
  var b2CircleShape= Box2D.Collision.Shapes.b2CircleShape;
  var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
  var b2DebugDraw  = Box2D.Dynamics.b2DebugDraw;
  var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
  var B2_DYNAMICBODY = Box2D.Dynamics.b2Body.b2_dynamicBody;

  function World() {
    this.boxWorld = null;
    this.actors = [];
    this.walls = [];
    this.finishActor = null;
    this.playerActor = null;
  }

  /**
   * Borders restrict movement of objects inside the viewport (map).
   */
  World.prototype.genBorders = function () {
    var borderDef = new b2BodyDef();
    borderDef.position.Set(0, 0);
    var borderBody = this.boxWorld.CreateBody(borderDef);

    var vec0 = new b2Vec2(0, 0);
    var vec1 = new b2Vec2(constants.MAP_WIDTH, 0);
    var vec2 = new b2Vec2(constants.MAP_WIDTH, constants.MAP_HEIGHT);
    var vec3 = new b2Vec2(0, constants.MAP_HEIGHT);
    var borderFixDef = new b2FixtureDef();
    borderFixDef.restitution = 1;
    borderFixDef.shape = new b2PolygonShape();
    borderFixDef.shape.SetAsEdge(vec0, vec1);
    borderBody.CreateFixture(borderFixDef, 0);
    borderFixDef.shape.SetAsEdge(vec1, vec2);
    borderBody.CreateFixture(borderFixDef, 0);
    borderFixDef.shape.SetAsEdge(vec2, vec3);
    borderBody.CreateFixture(borderFixDef, 0);
    borderFixDef.shape.SetAsEdge(vec0, vec3);
    borderBody.CreateFixture(borderFixDef, 0);
  };

  /**
   * Walls make up the labyrinth.
   */
  World.prototype.genWalls = function (walls) {
    for (var i = 0, size = walls.length ; i < size ; ++i) {
      var wall = walls[i];
      var wallBodyDef = new b2BodyDef();
      var hx = wall.width / 2;
      var hy = wall.height / 2;
      wallBodyDef.position.Set(wall.x + hx, wall.y + hy);
      var wallBody = this.boxWorld.CreateBody(wallBodyDef);
      var wallFixDef = new b2FixtureDef();
      wallFixDef.restitution = 1;
      wallFixDef.shape = new b2PolygonShape();
      wallFixDef.shape.SetAsBox(hx, hy);
      wallBody.CreateFixture(wallFixDef);
    }
  };

  World.prototype.genZombies = function (zombies) {
    for (var i = 0, size = zombies.length ; i < size ; ++i) {
      var zombie = zombies[i];
      var zombieBodyDef = new b2BodyDef();
      zombieBodyDef.position.Set(zombie.x, zombie.y);
      zombieBodyDef.type = B2_DYNAMICBODY;
      var zombieBody = this.boxWorld.CreateBody(zombieBodyDef);
      var zombieFixDef = new b2FixtureDef();
      zombieFixDef.restitution = 1;
      zombieFixDef.shape = new b2CircleShape(1);
      zombieBody.CreateFixture(zombieFixDef);
      zombieBody.SetLinearVelocity(zombie.v);

      var actor = new Actor();
      actor.setBoxBody(zombieBody);
      
      this.actors.push(actor);      
    }
  };

  World.prototype.genFinishPoint = function (finish) {
    var finishBodyDef = new b2BodyDef();
    finishBodyDef.position.Set(finish.x, finish.y);
    var finishBody = this.boxWorld.CreateBody(finishBodyDef);
    var finishFixDef = new Box2D.Dynamics.b2FixtureDef();
    finishFixDef.restitution = 1;
    finishFixDef.shape = new b2PolygonShape();
    finishFixDef.shape.SetAsBox(1, 1);
    finishBody.CreateFixture(finishFixDef);

    var actor = new Actor();
    actor.setBoxBody(finishBody);

    this.actors.push(actor);
    this.finishActor = actor;
  };

  World.prototype.genPlayer = function (startingPoint) {
    var playerBodyDef = new b2BodyDef();
    playerBodyDef.position.Set(startingPoint.x, startingPoint.y);
    playerBodyDef.type = B2_DYNAMICBODY;
    var playerBody = this.boxWorld.CreateBody(playerBodyDef);
    var playerFixDef = new Box2D.Dynamics.b2FixtureDef();
    playerFixDef.restitution = 1;
    playerFixDef.shape = new b2CircleShape(1);
    playerBody.SetLinearDamping(constants.PLAYER_VELOCITY_DAMP);
    playerBody.CreateFixture(playerFixDef);

    var actor = new Actor();
    actor.setBoxBody(playerBody);
    this.playerActor = actor;
  };  

  World.prototype.loadMap = function (map) {
    var world = this.boxWorld = new Box2D.Dynamics.b2World(new b2Vec2(0, 0), false);
    this.genBorders();
    this.genWalls(map.walls);
    this.genFinishPoint(map.finishPoint);
    this.genPlayer(map.startPoint);
    this.genZombies(map.zombies);
  };

  World.prototype.start = function () {
    var debugDraw = new b2DebugDraw();
    var world = this.boxWorld;
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(10.0);
    debugDraw.SetFillAlpha(1);
    debugDraw.SetLineThickness(2.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    this.boxWorld.SetDebugDraw(debugDraw);
  };

  return World;
});