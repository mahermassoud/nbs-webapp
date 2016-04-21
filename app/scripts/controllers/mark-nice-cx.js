'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:MarkNiceCxCtrl
 * @description
 * # MarkNiceCxCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')

  .controller('MarkNiceCxCtrl', function ($scope, $routeParams, $http,
                                          cxNetworkUtils, cyService, webServices, sharedProperties, utils) {
      var networkUUID = $routeParams.networkUUID;

      $scope.network = {};
      var network = $scope.network;


      var req = {
          'method': 'GET',
          'url': webServices.getDev2NdexBioServiceURL() + '/' + networkUUID + '/asCX'
      };

      $http( req

      ).success(
          // response is raw CX
          function( response ) {

              var niceCX = cxNetworkUtils.rawCXtoNiceCX(response);
              
              // add cravat attributes to network (if there are any)
              utils.addCravatAttributesToCX(niceCX, networkUUID);

              utils.markInQueryNodes(niceCX, networkUUID);

              network.niceCXwithInQueryNodesMarked = JSON.stringify(niceCX, null, 2);
          }
      ).error (
          function( response ) {

              // process error here
              console.log(response);

          }
      );

  });
