
"use strict"

angular.module('horseApp').directive "wind", [ ->
  restrict: "C"
  scope:
    speed: "@"
  link: (scope, element) ->

    scope.$watch 'speed', (before, after) ->
      if parseFloat(after) > 1
        $(element).css "opacity", "1"
      else
        $(element).css "opacity", scope.speed

    return
]