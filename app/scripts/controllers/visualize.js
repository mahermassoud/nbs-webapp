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

      console.log('in VisualizeCtrl; network UUID = ' + networkUUID);


      $scope.networkAsCX = {};
      var networkAsCX = $scope.networkAsCX;
      networkAsCX.network = undefined;

      //var SERVICE_URL = 'http://192.168.99.100:3000/converter/cx2cyjs';
      var SERVICE_URL = 'http://ci-dev-serv.ucsd.edu:3001/cx2cyjs';


      var req = {
        'method': 'GET',
        'url': 'http://dev2.ndexbio.org/rest/network/' + networkUUID + '/asCX',
      };

      $http( req

      ).success(

          function( response ) {

            console.log('got Network as CX success!!!');

            var networkAsCX = response;

            req = {
              'method': 'POST',
              'url': SERVICE_URL,
              data : angular.toJson(networkAsCX),

              'headers': {
                'Content-Type': 'application/json'
              }
            };

            //networkAsCX.network = response;

            $http( req

            ).success(

                function( response ) {

                    console.log('response success from Keis service!!!');


                    $scope.visualizeNetwork(response);
                    //networkAsCX.network = response;
                }



            ) .error (

                function( response ) {

                  console.log('response failed from Keis service!!! ' + response);


                }
            );

          }

      ).error (

          function( response ) {

            console.log('response failed!!!' + response);

            delete networkAsCX.network;

          }
      );

      $scope.visualizeNetwork = function(networkAsCX) {
          cyService.initCyGraph(networkAsCX);
      };

  });
