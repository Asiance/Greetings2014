'use strict'

angular.module('horseApp')
  .factory 'socket', ["socketFactory", (socketFactory) ->
    return socketFactory()
  ]