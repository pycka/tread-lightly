define(['components/Map', 'components/World'], function (Map, World) {
  var MAP_SIZE = 50;

  var data = window.data = {
    world: null,
    maps: {
      0: function map0() {
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
      },

      1: function map1() {
        var map = new Map();
        map.addWall(2, 16, 6, 14); 
        map.addWall(18, 2, 8, 6);
        map.addWall(18, 2, 12, 16);
        map.addWall(18, 2, 16, 26);
        map.addWall(18, 2, 12, 32);
        map.addWall(18, 2, 8, 40);
        map.addWall(6, 2, 40, 28);
        map.addWall(2, 18, 40, 28);
        map.addWall(6, 2, 36, 44);
        map.addZombie(30, 4);
        map.addZombie(6, 22);
        map.addZombie(38, 38);
        map.setStartPoint(2, 48);
        map.setFinishPoint(48, 2);
        return map;
      },

      2: function map2() {
        var map = new Map();
        map.addWall(8, 2, 4, 6); 
        map.addWall(2, 12, 4, 6);
        map.addWall(8, 2, 4, 42);
        map.addWall(2, 10, 4, 32);
        map.addWall(12, 2, 22, 4);
        map.addWall(16, 2, 24, 42);
        map.addWall(2, 16, 38, 14);
        map.addWall(2, 12, 44, 12);
        map.addWall(20, 2, 14, 14);
        map.addWall(2, 6, 14, 14);
        map.addWall(2, 10, 14, 24);
        map.addWall(22, 2, 14, 34);
        map.addWall(2, 4, 26, 30);
        map.addWall(2, 4, 26, 20);
        map.addWall(10, 2, 22, 24);
        map.addZombie(16, 6);
        map.addZombie(36, 7);
        map.addZombie(42, 32);        
        map.addZombie(4, 24);
        map.setStartPoint(24, 48);
        map.setFinishPoint(48, 2);
        return map;        
      }
    },

  };

  return data;
});