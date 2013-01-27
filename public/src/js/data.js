define(['components/Map', 'components/World'], function (Map, World) {
  var MAP_SIZE = 50;

  var data = {
    world: null,
    maps: {
      0: function m0() {
        var map = new Map();
        map.addWall(2, 22, 8, 18); 
        map.addWall(16, 2, 10, 38);
        map.addWall(2, 16, 20, 8);
        map.addWall(14, 2, 20, 22);
        map.addWall(10, 2, 30, 14);
        map.addWall(2, 14, 40, 14);
        map.addZombie(6, 46);
        map.addZombie(20, 4);
        map.setStartPoint(48, 48);
        map.setFinishPoint(2, 2);
        return map;
      }
    },

  };


  return data;
});