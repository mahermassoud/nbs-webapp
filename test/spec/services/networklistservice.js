'use strict';

describe('Service: networkListService', function () {

  // load the service's module
  beforeEach(module('ndexCravatWebappApp'));

  // instantiate service
  var networkListService;
  beforeEach(inject(function (_networkListService_) {
    networkListService = _networkListService_;
  }));

  it('should do something', function () {
    expect(!!networkListService).toBe(true);
  });

});
