(function() {
  'use strict';
  angular.module('horseApp').controller('GreetingsCtrl', function($scope, socket, $routeParams) {
    var animateGreeting;
    $scope.room = $routeParams.room;
    $scope.windVelocity = 0;
    $scope.distance = 0;
    console.log("[Debug] GreetingsCtrl, room ID: " + $scope.room);
    animateGreeting = function() {
      $scope.distance = $scope.distance + $scope.windVelocity;
    };
    return socket.on("rotate-wheel", function(data) {
      $scope.windVelocity = data.velocity;
      return animateGreeting();
    });
  });

}).call(this);

/*
//@ sourceMappingURL=greetings.js.map
*/