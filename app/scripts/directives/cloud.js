(function() {
  "use strict";
  angular.module('horseApp').directive("cloud", [
    function() {
      return {
        restrict: "C",
        scope: {
          distance: "@"
        },
        link: function(scope, element) {
          var originalRatio;
          originalRatio = 714;
          scope.$watch('distance', function(before, after) {
            if ($(element).hasClass('left')) {
              return element.css('left', '-' + after / 2 + '%');
            } else {
              return element.css('left', after / 2 + '%');
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