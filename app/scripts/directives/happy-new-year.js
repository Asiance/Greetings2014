(function() {
  "use strict";
  angular.module('horseApp').directive("happyNewYear", [
    function() {
      return {
        restrict: "C",
        scope: {
          distance: "@"
        },
        link: function(scope, element) {
          scope.$watch('distance', function(before, after) {
            console.log(after);
            if (parseFloat(after) >= 100) {
              $('.cloud').fadeOut();
              return element.addClass('active');
            }
          });
        }
      };
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=happy-new-year.js.map
*/