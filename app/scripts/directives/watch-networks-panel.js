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

          var delNetworkModal = $modal({
            scope: $scope,
            template: 'views/templates/confirmationModal.html',
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


          // [6] Delete network object
          $scope.deleteList = function (networkObj) {

             $scope.title = 'Delete Network';
             $scope.message = 'Delete network <strong>' + networkObj.name +   '</strong> ?';

             delNetworkModal.$promise.then(delNetworkModal.show);

             $scope.cancel = function() {
                delNetworkModal.hide();
             };

             $scope.confirm = function() {
                delNetworkModal.hide();
                networkListService.remove(networkObj);
             };
          };

          $scope.currentList = $routeParams.listId;

          $scope.gotoList = function(listId) {
            $location.path('watchlist/' + listId);
          };

        }
      };
    });
