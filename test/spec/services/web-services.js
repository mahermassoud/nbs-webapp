'use strict';

describe('Service: webServices', function () {

  // load the service's module
  beforeEach(module('ndexCravatWebappApp'));

  // instantiate service
  var webServices;
  beforeEach(inject(function (_webServices_) {
    webServices = _webServices_;
  }));

  it('should do something', function () {
    expect(!!webServices).toBe(true);
  });

});
