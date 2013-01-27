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
            showSplash();
        };

        data.onLevelFailure = function(){
            $('#next-map').hide();
            $('#continue').hide();
            $('#msg-box').text('Przegrana! :(');
            showSplash();
        };
        function showSplash(){
            data.sounds.background.setVolume(30);
            data.sounds.heartBeat.pause();
            $('#overlay').show();
        }

        function hideSplash(){
            $('#overlay').hide();
            data.sounds.background.setVolume(10);
            data.sounds.heartBeat.setVolume(80).loop().play();
        }
        $('#new-game').click(function(){
            data.mapId = 0;
            var map = data.maps[data.mapId]();
            data.world = new World();
            data.world.loadMap(map);
            data.world.start();
            loop.start(); // temporary
            hideSplash();
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
            hideSplash()
        });

        $('#creadits').click(function(){
            $('#creadits-list').toggleClass('visible')
        });

        $('#show-menu').click(function(){
            loop.stop(); // temporary
            //$('#next-map').hide();
            $('#continue').show();
            showSplash();
        });
        $('#continue').click(function(){
            loop.start(); // temporary
            hideSplash()
        });
});
