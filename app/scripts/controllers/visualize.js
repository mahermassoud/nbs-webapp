'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:VisualizeCtrl
 * @description
 * # VisualizeCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('VisualizeCtrl', function ($routeParams, $http, $scope, cyService, webServices, utils, cxNetworkUtils) {

    var networkUUID = $routeParams.networkUUID;


    $scope.visualizer = {};
    var visualizer = $scope.visualizer;

    visualizer.errorMessage = null;

    var req = {
      'method': 'GET',
      'url': webServices.getDev2NdexBioServiceURL() + '/' + networkUUID + '/asCX'
    };

    $http(req
    ).success(
      function (response) {

        // response is a CX network
        // First convert it to niceCX to make it easy to update attributes
        var niceCX = cxNetworkUtils.rawCXtoNiceCX(response);

        console.log(niceCX);

        utils.markInQueryNodes(niceCX, networkUUID);

        //var modifiedCX = cxNetworkUtils.niceCXToRawCX(niceCX);
        var layoutName = 'cose';

        // This maps attribute names in niceCX to attribute names in cyjs.
        // In some cases, such as 'id', 'source', and 'target', cyjs uses reserved names and
        // any attribute names that conflict must be mapped.
        // Also, cyjs requires that attribute names avoid special characters, so names with
        // special characters must be transformed and mapped.
        //
        var attributeNameMap = {};

        var cyElements = cyService.cyElementsFromNiceCX(niceCX, attributeNameMap);

        console.log(cyElements);

        console.log(attributeNameMap);

        var cyStyle = cyService.cyStyleFromNiceCX(niceCX, attributeNameMap);

        if (!cyStyle){
          cyStyle = cyService.getDefaultStyle();
        }

        if (cyService.allNodesHaveUniquePositions(cyElements)){
          layoutName = 'preset';
        }

        var cyLayout = {name: layoutName};

        cyService.initCyGraphFromCyjsComponents(cyElements, cyLayout, cyStyle);

        console.log(cyService.getCy());

/*
        var URL = webServices.getCx2CyJsServiceURL();


        req = {
          'method': 'POST',
          'url': URL,
          data: angular.toJson(originalCX),

          'headers': {
            'Content-Type': 'application/json'
          }
        };


        $http(req
        ).success(
          function (response) {

            //console.log(JSON.stringify(response));

            $scope.visualizeNetwork(response);
          }
        ).error(
          function (response) {

            console.log('Error querying cx2cys: ' + JSON.stringify(response));

            visualizer.errorMessage = 'Unable to convert Network in JSON to CYJS using<br /><br /> <strong>' +
              webServices.getCx2CyJsServiceURL() +
              '</strong> <br /><br />received this error : ' + JSON.stringify(response);

          }
        );
*/
      }
    ).error(
      function (response) {

        //console.log(JSON.stringify(response));

        console.log('Error querying NDEx: ' + JSON.stringify(response));

      }
    );


  });
