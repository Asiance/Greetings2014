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
            $(element).find("h1").css('opacity', parseFloat(after) / 100);
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