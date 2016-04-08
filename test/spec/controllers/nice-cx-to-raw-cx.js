'use strict';

describe('Controller: NiceCxToRawCxCtrl', function () {

  // load the controller's module
  beforeEach(module('ndexCravatWebappApp'));

  var NiceCxToRawCxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NiceCxToRawCxCtrl = $controller('NiceCxToRawCxCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NiceCxToRawCxCtrl.awesomeThings.length).toBe(3);
  });
});
