
"use strict"

angular.module('horseApp').directive "happyNewYear", [ ->
  restrict: "C"
  scope:
    distance: "@"
  link: (scope, element) ->
    scope.$watch 'distance', (before, after) ->
      $(element).find("h1").css 'opacity', parseFloat(after)/100
      if parseFloat(after) >= 100
        $('.cloud').fadeOut()
        element.addClass 'active'

    return
]