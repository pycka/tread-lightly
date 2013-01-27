define(function constants() {
  return {
    MAP_WIDTH   : 50,
    MAP_HEIGHT  : 50,

    KEY_UP      : 1,
    KEY_DOWN    : 2,
    KEY_LEFT    : 4,
    KEY_RIGHT   : 8,

    KEY_MOVE_MASK: 15,

    PLAYER_VELOCITY: 5,
    PLAYER_VELOCITY_DAMP:  2.5
  };
});