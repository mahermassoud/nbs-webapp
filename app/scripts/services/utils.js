'use strict';

/**
 * @ngdoc service
 * @name ndexCravatWebappApp.utils
 * @description
 * # utils
 * Service in the ndexCravatWebappApp.
 */
angular.module('ndexCravatWebappApp')
  .service('utils', function (sharedProperties, cxNetworkUtils) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.markInQueryNodes = function(niceCX, networkUUID) {

      var responseScores = sharedProperties.getResponseScores(networkUUID);
      var overlappedIDs = [];

      if (responseScores && responseScores.overlap) {
        for (var key in responseScores.overlap) {
          var nodeIds = responseScores.overlap[key];

          for (var index in nodeIds) {
            overlappedIDs.push(nodeIds[index]);
          }
        }
      }

      for (var i = 0; i < overlappedIDs.length; i++) {
        var nodeId = overlappedIDs[i];
        cxNetworkUtils.setNodeAttribute(niceCX, nodeId, 'inQuery', 'true');
      }
    };
  });
