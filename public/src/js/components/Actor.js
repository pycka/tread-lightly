define(function () {

  function Actor() {
    this.id      = null;
    this.type    = null;
    this.boxBody = null;
  }

  // Box2D body
  Actor.prototype.setBoxBody = function (body) {
    this.boxBody = body;
  };

  Actor.prototype.setType = function (type) {
    this.type = type; // ACTOR_TYPE_*
  };

  Actor.prototype.setId = function (id) {
    this.id = id;
  };

  return Actor;
});