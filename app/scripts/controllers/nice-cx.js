'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:NiceCxCtrl
 * @description
 * # NiceCxCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('NiceCxCtrl', function ($scope, $routeParams, $http, cxNetworkUtils, cyService) {

      var networkUUID = $routeParams.networkUUID;

      //var networkInRawCX, networkInNiceCX;

      $scope.network = {};
      var network = $scope.network;
      //rankedNetworksList.responseJSON = undefined;


        console.log('in NiceCxCtrl; network UUID = ' + networkUUID);

      var req = {
        'method': 'GET',
        'url': 'http://dev2.ndexbio.org/rest/network/' + networkUUID + '/asCX'
      };

      $http( req

      ).success(
          function( response ) {
              //
              // network.networkInNiceCX = JSON.stringify(cxNetworkUtils.rawCXtoNiceCX(response, networkUUID), null, '  ');
              network.networkWithProcessedCX =
                  (JSON.stringify(cxNetworkUtils.rawCXtoNiceCX(response, networkUUID), null, 2)).trim();
              network.networkInOriginalCX = response;

              var SERVICE_URL = 'http://ci-dev-serv.ucsd.edu:3001/cx2cyjs';

              var postData = angular.toJson(network.networkWithProcessedCX);

              req = {
                  'method': 'POST',
                  'url': SERVICE_URL,
                  //data : postData,
                  data : angular.toJson(network.networkInOriginalCX),

                  'headers': {
                      'Content-Type': 'application/json'
                  }
              };

              $http( req

              ).success(

                  function( response ) {

                      console.log('response success from Keis service with enriched network !!!');

                      cyService.initCyGraph(response);
                  }

              ) .error (

                  function( response ) {

                      console.log('response failed from Keis service with enriched network !!! ' + response);

                  }
              );





          }
      ).error (
          function( response ) {

            // process error here
            console.log(response);

          }
      );


  });
