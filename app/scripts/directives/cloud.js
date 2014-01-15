(function() {
  "use strict";
  angular.module('horseApp').directive("cloud", [
    function() {
      return {
        restrict: "C",
        scope: {
          distance: "@",
          speed: "@"
        },
        link: function(scope, element) {
          var originalRatio;
          originalRatio = 714;
          scope.$watch('distance', function(before, after) {
            if ($(element).hasClass('left')) {
              return element.css('left', '-' + (after / 2) * parseFloat(scope.speed) + '%');
            } else {
              return element.css('left', (after / 2) * parseFloat(scope.speed) + '%');
            }
          });
        }
      };
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=cloud.js.map
*/