'use strict'

angular.module('horseApp')
  .controller 'MobileCtrl', ($scope, $routeParams, $location, socket) ->

    $scope.room = $routeParams.room

    socket.emit('connect-mobile',
      room: $scope.room
    )

    $scope.$on 'rotate-wheel', (event, data) ->
      socket.emit('rotate-wheel',
        velocity: data.velocity
      )

    socket.on('message', (message) ->
      if message is "unknown-room"
        alert "Wrong code. Please retry."
        $location.path "/mobile-intro/"
    )