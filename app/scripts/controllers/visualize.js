'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:VisualizeCtrl
 * @description
 * # VisualizeCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('VisualizeCtrl', function ($routeParams, $http, $scope, cyService, webServices) {

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

              var responseInJSON = angular.toJson(response);

            req = {
              'method': 'POST',
              'url': webServices.getCx2CyJsServiceURL(),
              data : responseInJSON,

              'headers': {
                'Content-Type': 'application/json'
              }
            };



            $http( req

            ).success(

                function( response ) {

                    //console.log('response success from Keis service!!!');

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
