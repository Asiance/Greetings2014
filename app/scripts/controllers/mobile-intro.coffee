'use strict'

angular.module('horseApp')
  .controller 'MobileIntroCtrl', ($scope, $location) ->

    $scope.inputRoom = ""

    $scope.submitRoom = (event) ->
      event.preventDefault()
      console.log("[Debug] Room number submited: " + $scope.inputRoom);
      $location.path '/mobile/' + $scope.inputRoom