'use strict';

/**
 * @ngdoc directive
 * @name ndexCravatWebappApp.directive:watchNetworksPanel
 * @description
 * # watchNetworksPanel
 */
angular.module('ndexCravatWebappApp')
  .directive('watchNetworksPanel', function ($location, $modal, $routeParams, networkListService) {

      return {
        templateUrl: 'views/templates/watch-networks-panel.html',
        restrict: 'E',
        scope: {},

        link: function ($scope) {
          // [2] Initialize variables
          $scope.watchlist = {};

          var addListModal = $modal({
            scope: $scope,
            template: 'views/templates/add-network-modal.html',
            show: false
          });

          // [3] Bind model from service to this scope
          $scope.watchlists = networkListService.query();

          // [4] Display addlist modal
          $scope.showModal = function () {
            addListModal.$promise.then(addListModal.show);
          };

          // [5] Create a new list from fields in modal
          $scope.createList = function () {
            networkListService.save($scope.watchlist);
            addListModal.hide();
            $scope.watchlist = {};
          };

          // [6] Delete desired list and redirect to home
          $scope.deleteList = function (list) {
            networkListService.remove(list);
            $location.path('/');
          };


          $scope.currentList = $routeParams.listId;

          $scope.gotoList = function(listId) {
            $location.path('watchlist/' + listId);
          };

        }
      };
    });
