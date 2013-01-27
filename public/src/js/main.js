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

        data.loadSounds();
        data.sounds.background.setVolume(30).play();

        data.onLevelSuccess = function(){
            if (data.mapId >= data.maps.length -1) {
                $('#msg-box').text('Zwycięstwo! Pokanałeś grę!');
            } else {
                $('#msg-box').text('Zwycięstwo! :)');
            }
            $('#next-map').show();
            $('#continue').hide();
            $('#overlay').show();
        };

        data.onLevelFailure = function(){
            $('#next-map').hide();
            $('#continue').hide();
            $('#msg-box').text('Przegrana! :(');
            $('#overlay').show();
        };

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
