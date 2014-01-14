/*
Module dependencies.
*/


(function() {
  var app, express, io, server;

  express = require("express");

  app = express();

  server = require("http").createServer(app);

  io = require("socket.io").listen(server);

  app.configure(function() {});

  server.listen(3010, function() {
    return console.log("[Debug] Server listening on the port 3010");
  });

  io.sockets.on("connection", function(socket) {
    console.log("[Debug] New connection");
    socket.on("disconnect", function() {
      return console.log("[Debug] User disconnected, leaving rooms");
    });
    socket.on("connect-desktop", function(data) {
      console.log("[Debug] User desktop connected, joining room " + data.room);
      return socket.join(data.room);
    });
    socket.on("connect-mobile", function(data) {
      console.log("[Debug] User mobile connected, joining room " + data.room);
      if (io.sockets.clients(data.room).length === 0) {
        return socket.send("unknown-room");
      } else {
        socket.join(data.room);
        return socket.broadcast.to(data.room).emit("go-greetings", {
          room: data.room
        });
      }
    });
    return socket.on("rotate-wheel", function(data) {
      return socket.broadcast.to(data.room).emit("rotate-wheel", {
        velocity: data.velocity
      });
    });
  });

  exports.app = app;

}).call(this);

/*
//@ sourceMappingURL=greetings-asiance.js.map
*/