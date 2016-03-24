'use strict';

describe('Controller: CravatCtrl', function () {

  // load the controller's module
  beforeEach(module('ndexCravatWebappApp'));

  var CravatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CravatCtrl = $controller('CravatCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CravatCtrl.awesomeThings.length).toBe(3);
  });
});
