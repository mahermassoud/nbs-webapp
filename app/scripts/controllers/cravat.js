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

      $scope.submit = function() {

          var list = this.geneList.split(',');
          var myJsonString = JSON.stringify(list);


/*
          var req = {
              'method': 'POST',
              'url': 'http://52.38.63.223/esets/cravat_nci/query',
              'headers': {
                  'Content-Type': 'application/json'
              },
              'data': { 'ids': myJsonString }
          };


/*
          $http({method: "GET", url: "http://52.38.63.223/hello/foo"}).then(
              function success(data) {
                  var a = data;
                  var b = 10;
              },
              function failed(error){
                  var a = error;
                  var b = 10;
              });
*/
/*
          $http({
              withCredentials: false,
              method: 'post',
              url: 'http://52.38.63.223/esets/cravat_nci/query',
              headers: {'Content-Type': 'application/json'},
              data: { 'ids': myJsonString }
          });

*/
          $http.post('http://52.38.63.223/esets/cravat_nci/query',
              {'ids' : myJsonString}
          ).
              then(function(response) {
                  // success
                  console.log(response);
              },
              function(response) { // optional
                  // failed
                  console.log(response);
              });

          /*

          $http.post({
              url: "http://52.38.63.223/esets/cravat_nci/query",
              data: {"ids" : myJsonString},
              headers: {'Content-Type': 'application/json'}
          }).
              then(function(response) {
                  // success
                  var a = response;
              },
              function(response) { // optional
                  // failed
                  var b = response;
              });
           */
      };

        $scope.clearInput = function() {
            this.geneList = undefined;
        };
  });
