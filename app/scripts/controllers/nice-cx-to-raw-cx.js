'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:NiceCxToRawCxCtrl
 * @description
 * # NiceCxToRawCxCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('NiceCxToRawCxCtrl', function ($scope, $routeParams, $http, cxNetworkUtils, webServices, utils) {

      var networkUUID = $routeParams.networkUUID;

      $scope.network = {};
      var network = $scope.network;

      var req = {
          'method': 'GET',
          'url': webServices.getDev2NdexBioServiceURL() + '/' + networkUUID + '/asCX'
      };

      $http( req

      ).success(
          function( response ) {

              var niceCX = cxNetworkUtils.rawCXtoNiceCX(response);

              // add cravat attributes to network (if there are any)
              utils.addCravatAttributesToCX(niceCX, networkUUID);

              utils.markInQueryNodes(niceCX, networkUUID);

              var rawCX = cxNetworkUtils.niceCXToRawCX(niceCX);

              network.rawCXwithMarkedNodes = JSON.stringify(rawCX, null, 2);
          }
      ).error (
          function( response ) {

              // process error here
              console.log(response);

          }
      );

  });
