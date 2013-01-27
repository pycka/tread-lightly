define(['input', 'data', 'loop', 'const'], function (input, data, loop, con) {

  var logic = {

    checkInput: function () {
      var keys = input.getKeys();
      if (keys & con.KEY_MOVE_MASK) {
        var vv = new Box2D.Common.Math.b2Vec2(0, 0);
        if (keys & con.KEY_LEFT) {
          vv.x = -1;
        }
        else if (keys & con.KEY_RIGHT) {
          vv.x = 1;
        }
        if (keys & con.KEY_UP) {
          vv.y = -1;
        }
        else if (keys & con.KEY_DOWN) {
          vv.y = 1;
        }
        vv.Normalize()
        vv.Multiply(con.PLAYER_VELOCITY);
        data.world.playerActor.boxBody.SetLinearVelocity(vv);
      }
      // @todo handle Escape and other
    },

    checkWorld: function () {

    }

  };

  return logic;
});