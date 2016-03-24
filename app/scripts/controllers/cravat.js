'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:CravatCtrl
 * @description
 * # CravatCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('CravatCtrl', function ($scope, $routeParams, networkListService, $http, cyService) {

      //$scope.geneList = undefined;

      var u = 10;

      $scope.submit = function() {

          var list = this.geneList.split(",");
          var myJsonString = JSON.stringify(list);


          var req = {
              'method': 'POST',
              'url': 'http://52.38.63.223/esets/cravat_nci/query',
              'headers': {
                  'Content-Type': 'application/json'
              },
              'data': { ids: myJsonString }
          };

          $http(req).then(
              function(data) {
                  var a = data;
                  var b = 10;
              },
              function(error){
                  var a = error;
                  var b = 10;
              });



      };

        $scope.clearInput = function() {
            this.geneList = undefined;
        };
  });
