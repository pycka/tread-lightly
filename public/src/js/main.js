define(
    ['net', 'display', 'input', 'loop', 'data', 'components/World'],
    function (net, display, input, loop, data, World) {

        var server = {
            addr:'treadlightly',
            port:8085
        };

        // Initialize.
        input.connect();
        display.connect(document.getElementById('canvas'));

        // Play (should defer until server connection is up if co-op implemented).


        $('#new-game').click(function(){
            data.mapId = 0;
            var map = data.maps[data.mapId]();
            data.world = new World();
            data.world.loadMap(map);
            data.world.start();
            loop.start(); // temporary
            $('#overlay').hide();
        });

        $('#next-map').click(function(){
            data.mapId = typeof data.mapId === 'undefined' ? 0 : data.mapId;
            if (data.mapId < data.maps.length - 1) {
                data.mapId++;
            }
            var map = data.maps[data.mapId]();
            data.world = new World();
            data.world.loadMap(map);
            data.world.start();
            loop.start(); // temporary
            $('#overlay').hide();
        });

        $('#creadits').click(function(){
            $('#creadits-list').toggleClass('visible')
        });
        $('#show-menu').click(function(){
            loop.stop(); // temporary
            //$('#next-map').hide();
            $('#continue').show();
            $('#overlay').show();
        });
        $('#continue').click(function(){
            $('#overlay').hide();
            loop.start(); // temporary
        });
});
