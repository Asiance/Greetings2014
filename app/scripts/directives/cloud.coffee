
"use strict"

angular.module('horseApp').directive "cloud", [ ->
  restrict: "C"
  scope:
    distance: "@"
    speed: "@"
  link: (scope, element) ->
    originalRatio = 714

    scope.$watch 'distance', (before, after) ->
      if $(element).hasClass 'left'
        element.css('left', '-' + (after/2) * parseFloat(scope.speed) +  '%')
      else
        element.css('left', (after/2) * parseFloat(scope.speed) +  '%')

    return
]