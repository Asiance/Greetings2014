#!
# * Asiance Greetings 2014
# * Copyright(c) 2014 Laurent Le Graverend <laurent@legraverend.fr>
#

###
Module dependencies.
###
express = require("express")
app = express()
server = require("http").createServer(app)
io = require("socket.io").listen(server)

#
# Server configuration
#
app.configure ->

server.listen 3010, ->
  console.log "[Debug] Server listening on the port 3010"

io.sockets.on "connection", (socket) ->
  console.log "[Debug] New connection"

  socket.on "disconnect", ->
    console.log "[Debug] User disconnected, leaving rooms"

  socket.on "connect-desktop", (data) ->
    console.log "[Debug] User desktop connected, joining room " + data.room
    socket.join data.room

  socket.on "connect-mobile", (data) ->
    console.log "[Debug] User mobile connected, joining room " + data.room
    if io.sockets.clients(data.room).length is 0
      socket.send "unknown-room"
    else
      socket.join data.room
      socket.broadcast.to(data.room).emit "go-greetings",
        room: data.room

  socket.on "rotate-wheel", (data) ->
    socket.broadcast.to(data.room).emit "rotate-wheel",
      velocity: data.velocity

#
# exported for test usage
#
exports.app = app
