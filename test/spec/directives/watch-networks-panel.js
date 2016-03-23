'use strict';

describe('Directive: watchNetworksPanel', function () {

  // load the directive's module
  beforeEach(module('ndexCravatWebappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<watch-networks-panel></watch-networks-panel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the watchNetworksPanel directive');
  }));
});
