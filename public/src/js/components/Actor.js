define(function () {

  function Actor() {
    this.boxBody = null;
  }

  // Box2D body
  Actor.prototype.setBoxBody = function (body) {
    this.boxBody = body;
  };

  return Actor;
});