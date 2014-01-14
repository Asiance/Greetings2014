(function() {
  'use strict';
  angular.module('horseApp').controller('MobileCtrl', function($scope, $routeParams, $location, socket) {
    $scope.room = $routeParams.room;
    socket.emit('connect-mobile', {
      room: $scope.room
    });
    $scope.$on('rotate-wheel', function(event, data) {
      return socket.emit('rotate-wheel', {
        velocity: data.velocity
      });
    });
    return socket.on('message', function(message) {
      if (message === "unknown-room") {
        alert("Wrong code. Please retry.");
        return $location.path("/mobile-intro/");
      }
    });
  });

}).call(this);

/*
//@ sourceMappingURL=mobile.js.map
*/