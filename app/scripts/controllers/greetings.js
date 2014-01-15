(function() {
  'use strict';
  angular.module('horseApp').controller('GreetingsCtrl', [
    "$scope", "$routeParams", "socket", function($scope, $routeParams, socket) {
      var animateGreeting;
      $scope.room = $routeParams.room;
      $scope.windVelocity = 0;
      $scope.distance = 0;
      console.log("[Debug] GreetingsCtrl, room ID: " + $scope.room);
      socket.emit('connect-desktop', {
        room: $scope.room
      });
      animateGreeting = function() {
        $scope.distance = $scope.distance + $scope.windVelocity;
      };
      return socket.on("rotate-wheel", function(data) {
        $scope.windVelocity = data.velocity;
        return animateGreeting();
      });
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=greetings.js.map
*/