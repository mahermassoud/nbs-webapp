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
      

      $scope.errorReceived = {};
      var errorReceived = $scope.errorReceived;

      $scope.responseReceived = {};
      var responseReceived = $scope.responseReceived;

      var req = {
        'method': 'GET',
        'url': webServices.getDev2NdexBioServiceURL() + '/' + networkUUID + '/asCX'
      };

      $http( req

      ).success(

          function( response ) {

              //var rawCX = angular.toJson(response);


              var niceCX = cxNetworkUtils.rawCXtoNiceCX(response);

              utils.markInQueryNodes(niceCX, networkUUID);

              var rawCX1 = [];
              cxNetworkUtils.niceCXToRawCX(niceCX, rawCX1);

              //var vis = JSON.stringify(rawCX, null, 2);

              //$scope.visualizeNetwork(rawCX);


              var URL = webServices.getCx2CyJsServiceURL();


            req = {
              'method': 'POST',
              'url': URL,
              data : rawCX1,

              'headers': {
                'Content-Type': 'application/json'
              }
            };



            $http( req

            ).success(

                function( response ) {

                    $scope.visualizeNetwork(response);
                }

            ) .error (

                function( response ) {

                    errorReceived.message = 'Unable to convert Network in JSON to CYJS using<br /><br /> <strong>' +
                        webServices.getCx2CyJsServiceURL() +
                        '</strong> <br /><br />received this error : ' + response;

                }
            );

          }

      ).error (

          function( response ) {

            console.log('response failed!!!' + response);

          }
      );

      $scope.visualizeNetwork = function(networkAsCYJS) {
          cyService.initCyGraph(networkAsCYJS);
          //cyService.setCyjsNetwork(networkAsCYJS);
      };

  });
