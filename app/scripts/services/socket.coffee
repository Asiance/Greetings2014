'use strict'

angular.module('horseApp')
  .factory 'socket', (socketFactory) ->
    return socketFactory()