'use strict';

/**
 * @ngdoc service
 * @name ndexCravatWebappApp.webServices
 * @description
 * # webServices
 * Service in the ndexCravatWebappApp.
 */
angular.module('ndexCravatWebappApp')
  .service('webServices', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var ENRICHMENT_SERVICE_URL   = 'http://enrich.ndexbio.org/enrich/v1/api/esets/query';
    var CX2CYJS_URL              = 'http://ci-dev-serv.ucsd.edu:3001/cx2cyjs';
    var DEV2_NDEXBIO_SERVICE_URL = 'http://dev2.ndexbio.org/rest/network';

    return {
      getEnrichmentServiceURL: function () {
        return ENRICHMENT_SERVICE_URL;
      },

      getCx2CyJsServiceURL: function () {
        return CX2CYJS_URL;
      },

      getDev2NdexBioServiceURL: function () {
        return DEV2_NDEXBIO_SERVICE_URL;
      }
    };
  });