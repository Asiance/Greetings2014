(function() {
  'use strict';
  angular.module('horseApp').controller('MobileIntroCtrl', [
    "$scope", "$location", function($scope, $location) {
      $scope.inputRoom = "";
      return $scope.submitRoom = function(event) {
        event.preventDefault();
        console.log("[Debug] Room number submited: " + $scope.inputRoom);
        return $location.path('/mobile/' + $scope.inputRoom);
      };
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=mobile-intro.js.map
*/