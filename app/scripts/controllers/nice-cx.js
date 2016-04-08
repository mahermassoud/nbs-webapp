'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:NiceCxCtrl
 * @description
 * # NiceCxCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('NiceCxCtrl', function ($scope, $routeParams, $http, cxNetworkUtils, cyService, webServices) {

      var networkUUID = $routeParams.networkUUID;

      $scope.network = {};
      var network = $scope.network;


        //console.log('in NiceCxCtrl; network UUID = ' + networkUUID);

      var req = {
        'method': 'GET',
        'url': webServices.getDev2NdexBioServiceURL() + '/' + networkUUID + '/asCX'
      };

      $http( req

      ).success(
          function( response ) {

              network.niceCX =
                  JSON.stringify(cxNetworkUtils.rawCXtoNiceCX(response), null, 2);


              /*
              var postData = angular.toJson(network.niceCX);

              /*
              req = {
                  'method': 'POST',
                  'url': webServices.getCx2CyJsServiceURL(),
                  data : angular.toJson(network.rawCX),

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
              */

          }
      ).error (
          function( response ) {

            // process error here
            console.log(response);

          }
      );


  });
