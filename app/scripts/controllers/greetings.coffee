'use strict'

angular.module('horseApp')
  .controller 'GreetingsCtrl', ($scope, socket, $routeParams) ->

    $scope.room = $routeParams.room
    $scope.windVelocity = 0
    $scope.distance = 0

    console.log "[Debug] GreetingsCtrl, room ID: " + $scope.room

    animateGreeting = () ->
      $scope.distance = $scope.distance + $scope.windVelocity
      return

    socket.on "rotate-wheel", (data) ->
      $scope.windVelocity = data.velocity
      animateGreeting()
