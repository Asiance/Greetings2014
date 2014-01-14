
"use strict"

angular.module('horseApp').directive "happyNewYear", [ ->
  restrict: "C"
  scope:
    distance: "@"
  link: (scope, element) ->
    scope.$watch 'distance', (before, after) ->
      console.log(after);
      if parseFloat(after) >= 100
        $('.cloud').fadeOut()
        element.addClass 'active'

    return
]