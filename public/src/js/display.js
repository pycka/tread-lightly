define(['const'], function (con) {
  var scale = 1;
  var black = '#000';
  var backgroundColor = '#aaa';
  var wallColor = '#222';
  var finishPointBg = 'gold';
  var finishPointBorder = 'yellow';

  var display = {
    context: null,

    connect: function (canvasElement) {
      this.context = canvasElement.getContext('2d');
      scale = parseInt(canvasElement.getAttribute('height'), 10) / con.MAP_HEIGHT;
    },

    draw: function (world) {
      var ctx = this.context;
      var x, y, w, h;
      // world.DrawDebugData();

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
      for (var i = 0, size = actors.length ; i < size ; ++i) {
        
      }
    }
  };

  return display;
});