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
    
    const CRAVAT_VISUAL_STYLE = [
      {
        selector: 'node',
        style: {
          'background-color': 'rgb(0, 220, 200)',
          'background-opacity': 0.8,
          'width': '40px',
          'height': '40px',
          'label': 'data(name)',
          'font-family': 'Roboto, sans-serif'
        }
      },
      {
        selector: 'edge',
        style: {
          'line-color': '#aaaaaa',
          'width': '2px',
          ///'label': 'data(interaction)',
          'font-family': 'Roboto, sans-serif',
          'text-opacity': 0.8
        }
      },
      {
        selector: 'node:selected',
        style: {
          'background-color': 'yellow'
        }
      },
      {
        selector: 'edge:selected',
        style: {
          'line-color': 'yellow',
          'width': 6
        }
      },
      {
        selector: 'node[inQuery = "true"]',
        style: {
          'background-color': 'red'
        }
      }
    ];
    
    this.getCravatVisualizeStyle = function () {
      return CRAVAT_VISUAL_STYLE;
    };

    this.markInQueryNodes = function (niceCX, networkUUID) {

      var responseScores = sharedProperties.getResponseScores(networkUUID);

      if (responseScores) {
        var overlappedIDs = [];

        if (responseScores.overlap) {
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
      }
    };

  });
