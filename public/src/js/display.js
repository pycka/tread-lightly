define(['const'], function (con) {
  var scale = 1;
  var black = '#000';
  var backgroundColor = '#aaa';
  var wallColor = '#222';
  var finishPointBg = 'gold';
  var finishPointBorder = 'yellow';
  var shadow = null; 
  var transparent = 'rgba(0,0,0, 0.4)';


  var zombieImage = new Image();
  zombieImage.src = '/src/img/zombie.png';
  var playerImage = new Image();
  playerImage.src = '/src/img/goodie.png';

  var display = {
    context:      null,
    canvasWidth:  null,
    canvasHeight: null,

    connect: function (canvasElement) {
      this.context = canvasElement.getContext('2d');
      this.canvasHeight = parseInt(canvas.getAttribute('height'), 10);
      this.canvasWidth = parseInt(canvas.getAttribute('width'), 10);
      scale = this.canvasHeight / con.MAP_HEIGHT;
      shadow = this.context.createRadialGradient(0,0,0,0,0,100);
      shadow.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      shadow.addColorStop(1, black);
    },

    draw: function (world) {
      var ctx = this.context;
      var x, y, w, h;

      // Background:
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, con.MAP_WIDTH * scale, con.MAP_HEIGHT * scale);

      // Borders around the viewport:
      ctx.fillStyle = black;
      ctx.strokeStyle = black;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, con.MAP_HEIGHT * scale);
      ctx.lineTo(con.MAP_WIDTH * scale, con.MAP_HEIGHT * scale);
      ctx.lineTo(con.MAP_WIDTH * scale, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();

      // Walls:
      ctx.fillStyle = wallColor;
      var walls = world.walls;
      for (var i = 0, size = walls.length ; i < size ; ++i) {
        var wall = walls[i];
        x = wall.x * scale;
        y = wall.y * scale;
        w = wall.width * scale;
        h = wall.height * scale;
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
      }

      // Finish point:
      ctx.fillStyle = finishPointBg;
      ctx.strokeStyle = finishPointBorder;
      var finishPosVec = world.finishActor.boxBody.GetPosition();
      x = finishPosVec.x * scale;
      y = finishPosVec.y * scale;
      w = con.FINISH_POINT_SIZE * scale;
      h = con.FINISH_POINT_SIZE * scale;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);

      // Actors (zombies and player):
      var actors = world.actors;
      var relVec = new Box2D.Common.Math.b2Vec2(1, 1);
      relVec.Normalize();
      for (var i = 0, size = actors.length ; i < size ; ++i) {
        var actor = actors[i];
        var actorPos = actor.boxBody.GetPosition();
        var isZombie = actor.type === con.ACTOR_TYPE_ZOMBIE;
        var image =  isZombie ? zombieImage : playerImage;

        ctx.save();
          var angle = actor.boxBody.GetLinearVelocity();
          angle = getDirection(angle);
          ctx.translate(actorPos.x * scale -10, actorPos.y * scale - 10);
          ctx.rotate(angle + Math.PI / 2);
          ctx.drawImage(image, -20, isZombie ? -26 : -20);
        ctx.restore();
      }

      // Shadow:
      ctx.fillStyle = shadow;
      var playerPos = world.playerActor.boxBody.GetPosition();
      var px = playerPos.x * scale -10;
      var py = playerPos.y * scale -10;
      shadow = this.context.createRadialGradient(px,py,0,px,py, con.PLAYER_SIGHT_RANGE);
      shadow.addColorStop(0, transparent);
      shadow.addColorStop(1, black);
      ctx.fillRect(0, 0, con.MAP_WIDTH * scale, con.MAP_HEIGHT * scale);
    }
  };

  function getDirection(point) {
    var hypotenuse = point.Length();
    if (hypotenuse === 0) {
      return 0;
    }
    var leftSide = point.x < 0;
    var dy = point.y;
    var deg;

    if (dy === 0) { // on x axis
      deg = leftSide ? Math.PI : 0;
    }
    else {
      var deg = Math.asin(dy / hypotenuse);
      if (leftSide) {
        if (deg < 0) { // lower half of the space
          deg = - Math.PI - deg;
        }
        else {
          deg = Math.PI - deg;
        }
      }
    }
    return deg;
  }

  return display;
});