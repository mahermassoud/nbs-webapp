'use strict';

describe('Service: cyService', function () {

  // load the service's module
  beforeEach(module('ndexCravatWebappApp'));

  // instantiate service
  var cyService;
  beforeEach(inject(function (_cyService_) {
    cyService = _cyService_;
  }));

  it('should do something', function () {
    expect(!!cyService).toBe(true);
  });

});
