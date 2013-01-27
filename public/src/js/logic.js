define(['input', 'data', 'const'], function (input, data, con) {
    var Distance = Box2D.Common.Math.b2Math.Distance;

    var logic = {

        checkInput:function () {
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

        checkWorld:function (loop) {
            // look for success (player finds gold)
            var playerPos = data.world.playerActor.boxBody.GetPosition();
            var finishPos = data.world.finishActor.boxBody.GetPosition();

            if (Distance(playerPos, finishPos) < con.FINISH_WIN_RANGE) {
                data.onLevelSuccess();
                loop.stop();
            }

            // watch out for zombies
            var zombies = data.world.zombies;
            for (var i = 0, size = zombies.length; i < size; ++i) {
                if (Distance(playerPos, zombies[i].boxBody.GetPosition()) < con.ZOMBIE_KILL_RANGE) {
                    data.onLevelFailure();
                    loop.stop();
                }
            }
        }
    };

    return logic;
});