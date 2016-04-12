'use strict';

describe('Controller: VisualizeEnrichedCtrl', function () {

  // load the controller's module
  beforeEach(module('ndexCravatWebappApp'));

  var VisualizeEnrichedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VisualizeEnrichedCtrl = $controller('VisualizeEnrichedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VisualizeEnrichedCtrl.awesomeThings.length).toBe(3);
  });
});
