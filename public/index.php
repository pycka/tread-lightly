<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Tread Lightly</title>
    <link rel="stylesheet" href="/src/css/all.css"/>
  </head>
  <body>
    <div id="game">
      <div class="menu">
        <ul>
          <li data-option="new">New Game</li>
          <li data-option="lobby">Lobby</li>
          <li data-option="credits">Credits</li>
        </ul>
      </div><!-- .menu -->
      <canvas width="520" height="520"></canvas>
    </div>

    <script src="/lib/js/jquery.js"></script>
    <script src="/lib/js/require.js" data-main="src/js/main.js"></script>
  </body>
</html>