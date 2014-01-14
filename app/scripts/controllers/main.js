(function() {
  'use strict';
  angular.module('horseApp').controller('MainCtrl', function($scope, $location, $cookieStore, socket) {
    if (!$cookieStore.get('connected')) {
      $scope.room = Base58.numberToAlpha(new Date().getTime().toString().substr(0, 11));
      $cookieStore.put('connected', $scope.room);
    } else {
      $scope.room = $cookieStore.get('connected');
    }
    socket.emit('connect-desktop', {
      room: $scope.room
    });
    return socket.on("go-greetings", function(data) {
      console.log("[Debug] User connected, going to greetings page: " + data.room);
      return $location.path("greetings/" + $scope.room);
    });
  });

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/