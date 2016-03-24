'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
    .controller('MainCtrl', function ($scope, $location, networkListService) {
      // [1] Populate networklists for dynamic nav links
      $scope.networklists = networkListService.query();

      // [2] Using the $location.path() function as a $watch expression
      $scope.$watch(function () {
            return $location.path();
          },
          function (path) {
            if (_.includes(path, 'watchlist')) {
              $scope.activeView = 'watchlist';
            } else if (_.includes(path, 'dashboard')) {
              $scope.activeView = 'dashboard';
            } else if (_.includes(path, 'cravat')) {
              $scope.activeView = 'cravat';
            }
          });
    });