'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:NiceCxCtrl
 * @description
 * # NiceCxCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('NiceCxCtrl', function ($scope, $routeParams, $http, cxNetworkUtils) {

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
              network.networkInRawCX = response;
              network.networkInNiceCX = JSON.stringify(cxNetworkUtils.rawCXtoNiceCX(response), null, '  ');
          }
      ).error (
          function( response ) {

            // process error here
            console.log(response);

          }
      );


  });
