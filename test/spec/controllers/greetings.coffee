'use strict'

describe 'Controller: GreetingsctrlCtrl', () ->

  # load the controller's module
  beforeEach module 'horseApp'

  GreetingsctrlCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    GreetingsctrlCtrl = $controller 'GreetingsctrlCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
