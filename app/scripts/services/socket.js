(function() {
  'use strict';
  angular.module('horseApp').factory('socket', [
    "socketFactory", function(socketFactory) {
      return socketFactory();
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=socket.js.map
*/