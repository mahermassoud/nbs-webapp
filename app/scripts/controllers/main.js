'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
    .controller('MainCtrl', function ($scope, $location) {

      $scope.$watch(function () {
            return $location.path();
          },
          function (path) {
            if (_.includes(path, 'analysis')) {
              $scope.activeView = 'analysis';
            }
          });
    });