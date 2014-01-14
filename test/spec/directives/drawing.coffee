'use strict'

describe 'Directive: drawing', () ->

  # load the directive's module
  beforeEach module 'horseApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<drawing></drawing>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the drawing directive'
