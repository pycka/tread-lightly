define(function constants() {
  return {
    MAP_WIDTH   : 50,
    MAP_HEIGHT  : 50,

    KEY_UP_CODES: { 87: true, 119: true, 38: true },
    KEY_UP      : 1,

    KEY_DOWN_CODES: { 83: true, 115: true, 40: true },
    KEY_DOWN    : 2,

    KEY_LEFT_CODES: { 65: true, 97: true, 37: true },
    KEY_LEFT    : 4,

    KEY_RIGHT_CODES: { 68: true, 100: true , 39: true },
    KEY_RIGHT   : 8,

    KEY_MOVE_MASK: 15,

    PLAYER_RADIUS:         1.5,
    PLAYER_VELOCITY:       7,
    PLAYER_VELOCITY_DAMP:  7,
    PLAYER_SIGHT_RANGE:    120,

    FINISH_POINT_SIZE:     1,

    ACTOR_TYPE_PLAYER:     0,
    ACTOR_TYPE_ZOMBIE:     1,

    ZOMBIE_RADIUS:         2,
  };
});