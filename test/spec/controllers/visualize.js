'use strict';

describe('Controller: VisualizeCtrl', function () {

  // load the controller's module
  beforeEach(module('ndexCravatWebappApp'));

  var VisualizeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VisualizeCtrl = $controller('VisualizeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VisualizeCtrl.awesomeThings.length).toBe(3);
  });
});
