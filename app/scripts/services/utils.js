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
          'font-family': 'Roboto, sans-serif',
            'border-width' : '2px'
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
          'border-color': 'red'
        }
      },
        {
            selector: 'node[VEST pathogenicity score (non-silent)]',
            style: {
                'background-color': 'mapData(VEST pathogenicity score (non-silent), 0, 1, rgb(255,0,0), rgb(128,128,128))'
            }
        }
    ];
    
    this.getCravatVisualizeStyle = function () {
      return CRAVAT_VISUAL_STYLE;
    };


    this.markInQueryNodes = function (niceCX, networkUUID) {
        var overlappedIDs = getOverlappedIDsForNetwork(networkUUID);

        for (var i = 0; i < overlappedIDs.length; i++) {
            var nodeId = overlappedIDs[i];
            cxNetworkUtils.setNodeAttribute(niceCX, nodeId, 'inQuery', 'true');
        }
    };


    this.addCravatAttributesToCX = function (niceCX, networkUUID) {

        var responseScores = sharedProperties.getResponseScores(networkUUID);
        var cravatData = sharedProperties.getCravatData();

        if (!responseScores && !responseScores.overlap) {
            return;
        }

        if (!cravatData) {
            return;
        }

        for (var key in responseScores.overlap) {

            if (!cravatData.hasOwnProperty(key)) {
                continue;
            }

            var cravatDataEntry = cravatData[key];
            var nodeIds = responseScores.overlap[key];

            for (var index in nodeIds) {

                // loop through all key/value pairs from cravatDataEntry Object, and set them as node attributes
                for (var cravatEntryKey in cravatDataEntry) {

                    if (!cravatDataEntry[cravatEntryKey]) {
                        // skip empty entries; i.e., entries with keys and no values
                        continue;
                    }

                    var nodeId = nodeIds[index];

                    var cravatDataValue = isNaN(cravatDataEntry[cravatEntryKey]) ?
                        cravatDataEntry[cravatEntryKey] :
                        parseFloat(cravatDataEntry[cravatEntryKey]);

                    cxNetworkUtils.setNodeAttribute(niceCX, nodeId, cravatEntryKey, cravatDataValue);
                }
            }
        }
    };



    var getOverlappedIDsForNetwork = function(networkUUID) {

        var overlappedIDs = [];
        var responseScores = sharedProperties.getResponseScores(networkUUID);

        if (!responseScores) {
            return overlappedIDs;
        }

        if (responseScores.overlap) {
            for (var key in responseScores.overlap) {
                var nodeIds = responseScores.overlap[key];

                for (var index in nodeIds) {
                    overlappedIDs.push(nodeIds[index]);
                }
            }
        }

        return overlappedIDs;
    };

  });
