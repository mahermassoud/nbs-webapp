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

        utils.markInQueryNodes(niceCX, networkUUID);

        //var modifiedCX = cxNetworkUtils.niceCXToRawCX(niceCX);

        cyService.initCyGraphFromNiceCx(niceCX);

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
