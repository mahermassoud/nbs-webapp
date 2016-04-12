'use strict';

describe('Controller: VisualizeOriginalCtrl', function () {

  // load the controller's module
  beforeEach(module('ndexCravatWebappApp'));

  var VisualizeOriginalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VisualizeOriginalCtrl = $controller('VisualizeOriginalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VisualizeOriginalCtrl.awesomeThings.length).toBe(3);
  });
});
