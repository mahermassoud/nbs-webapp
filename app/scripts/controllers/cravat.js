'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:CravatCtrl
 * @description
 * # CravatCtrl
 * Controller of the ndexCravatWebappApp
 */
/*
ndexApp.controller('userController',
    ['ndexService', 'ndexUtility', 'sharedProperties', '$scope', '$location', '$routeParams', '$route', '$modal',
        function (ndexService, ndexUtility, sharedProperties, $scope, $location, $routeParams, $route, $modal)
*/

angular.module('ndexCravatWebappApp')
  .controller('CravatCtrl', ['$scope', '$resource', '$routeParams', '$http',

    function ($scope, $resource, $routeParams, $http) {

      $scope.rankedNetworksList = {};
      var rankedNetworksList = $scope.rankedNetworksList;
      rankedNetworksList.responseJSON = 'ABC10';


        $scope.submit = function() {

          var list = rankedNetworksList.geneList.split(',');

          rankedNetworksList.responseJSON = 'DEFGHIJKLMNOP10';
          console.log('in submit: rankedNetworksList.responseJSON = ' + rankedNetworksList.responseJSON);
            console.log('in submit: list.length = ' + list.length);
          //console.log('in submit: rankedNetworksList.responseJSON = ' + rankedNetworksList.responseJSON);

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

                  //var rListValue1 = rankedNetworksList.responseJSON;
                  //console.log('rListValue1 = ' + rListValue1);

                  rankedNetworksList.responseJSON = JSON.stringify(response, null, '   ');
                  console.log('received success, response=' + response);
                  console.log('rankedNetworksList.responseJSON = ' + rankedNetworksList.responseJSON);

              }
          ).error (
              function( response ) {
                  console.log('received error ' + response);
                  //rankedNetworksList.responseJSON = "GHI";
                  $scope.rankedNetworksList = 'GHI';
                  //$scope.$apply();
                  // var r = 10;
              });
      };

        $scope.clearInput = function() {
            this.geneList = undefined;
            rankedNetworksList.responseJSON = 'in clear';
            console.log('in clear: rankedNetworksList.responseJSON = ' + rankedNetworksList.responseJSON);
        };
  }]);
