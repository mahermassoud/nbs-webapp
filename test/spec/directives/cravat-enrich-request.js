'use strict';

describe('Directive: cravatEnrichRequest', function () {

  // load the directive's module
  beforeEach(module('ndexCravatWebappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cravat-enrich-request></cravat-enrich-request>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cravatEnrichRequest directive');
  }));
});
