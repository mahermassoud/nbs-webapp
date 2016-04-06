'use strict';

describe('Controller: NiceCxCtrl', function () {

  // load the controller's module
  beforeEach(module('ndexCravatWebappApp'));

  var NiceCxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NiceCxCtrl = $controller('NiceCxCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NiceCxCtrl.awesomeThings.length).toBe(3);
  });
});
