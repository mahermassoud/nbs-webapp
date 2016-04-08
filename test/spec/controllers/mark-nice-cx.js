'use strict';

describe('Controller: MarkNiceCxCtrl', function () {

  // load the controller's module
  beforeEach(module('ndexCravatWebappApp'));

  var MarkNiceCxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarkNiceCxCtrl = $controller('MarkNiceCxCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MarkNiceCxCtrl.awesomeThings.length).toBe(3);
  });
});
