'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:VisualizeCtrl
 * @description
 * # VisualizeCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('VisualizeCtrl', function ($routeParams, $http, $scope, cyService) {

      var networkUUID = $routeParams.networkUUID;
      var SERVICE_URL = 'http://ci-dev-serv.ucsd.edu:3001/cx2cyjs';

      //console.log('in VisualizeCtrl; network UUID = ' + networkUUID);

      var req = {
        'method': 'GET',
        'url': 'http://dev2.ndexbio.org/rest/network/' + networkUUID + '/asCX'
      };

      $http( req

      ).success(

          function( response ) {

            //console.log('got Network as CX success!!!');

            req = {
              'method': 'POST',
              'url': SERVICE_URL,
              data : angular.toJson(response),

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

                  //console.log('response failed from Keis service!!! ' + response);

                }
            );

          }

      ).error (

          function( response ) {

            //console.log('response failed!!!' + response);

          }
      );

      $scope.visualizeNetwork = function(networkAsCYJS) {
          cyService.initCyGraph(networkAsCYJS);
          //cyService.setCyjsNetwork(networkAsCYJS);
      };

  });
