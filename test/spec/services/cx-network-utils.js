'use strict';

describe('Service: cxNetworkUtils', function () {

  // load the service's module
  beforeEach(module('ndexCravatWebappApp'));

  // instantiate service
  var cxNetworkUtils;
  beforeEach(inject(function (_cxNetworkUtils_) {
    cxNetworkUtils = _cxNetworkUtils_;
  }));

  it('should do something', function () {
    expect(!!cxNetworkUtils).toBe(true);
  });

});
