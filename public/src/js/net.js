define(function () {
  "use strict";

  var net = {
    conn: null,

    connect: function (server, callback) {
      this.conn = new WebSocket('ws://' + server.addr + ':' + server.port);

      this.conn.onopen = function () {
        console.log('net:connected');
        callback();
      };

      this.conn.onclose = function () {
        alert('connection closed');
        console.log('net:close', arguments);
      };

      this.conn.onerror = function () {
        alert('network error');
        console.log('net:error', arguments);
      };

      this.conn.onmessage = function (message) {
        net.recv(JSON.parse(message.data));
      };
    },

    send: function (data) {
      if (typeof data !== 'string') {
        data = JSON.stringify(data);
      }
      this.conn.send(data);
    },

    recv: function (data) {
      console.log('net:recv', data);
    }

  };

  return net;
});