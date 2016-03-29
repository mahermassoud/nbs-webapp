'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:CravatCtrl
 * @description
 * # CravatCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('CravatCtrl', function ($scope, $resource, $routeParams, networkListService, $http) {

      //$scope.geneList = undefined;

      $scope.rankedNetworksList = {};
      var rankedNetworksList = $scope.rankedNetworksList;


      $scope.submit = function() {

          var list = this.geneList.split(',');

          var myObj = {'ids': list };
          var myJsonString = JSON.stringify(myObj);

          var req = {
              'method': 'POST',
              'url': 'http://enrich.ndexbio.org/esets/cravat_nci/query',
              'headers': {
                  'Content-Type': 'application/json'
              },
              'data': myJsonString
          };


          $http( req

          ).success(
              function( response ) {
                  rankedNetworksList.responseJSON = JSON.stringify(response, null, '   ');
                  var i = 10;
              }
          );

      };

        $scope.clearInput = function() {
            this.geneList = undefined;
        };
  });
