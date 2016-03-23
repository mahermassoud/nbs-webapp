'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:WatchlistCtrl
 * @description
 * # WatchlistCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('WatchlistCtrl', function ($scope, $routeParams, networkListService, $http, cyService) {

    $scope.currentNetworkId = $routeParams.listId;

    var networkObj = networkListService.query($scope.currentNetworkId);

    var networkUUID = (networkObj) ? networkObj.UUID : undefined;

      $scope.viewer = {};

      var viewer = $scope.viewer;

      viewer.networkUUID = networkUUID;


      viewer.ndex2cyjsEndpoint = 'http://ci-dev-serv.ucsd.edu:3001/ndex2cyjs/';

      viewer.cyjsURL = viewer.ndex2cyjsEndpoint + viewer.networkUUID;

      viewer.queryError = null;
      viewer.cyjsData = null;
      viewer.prettyCyjsData = 'waiting for response';


      if (viewer.cyjsURL) {

        //cyService.initCyGraph();

        $http.get(viewer.cyjsURL)
            .success(
            function (cyjsData) {
              viewer.cyjsData = cyjsData;

              viewer.queryError = null;

              //viewer.hackCyjsData();

              viewer.prettyCyjsStyle = JSON.stringify(viewer.cyjsData.style, null, '   ');

              viewer.prettyCyjsNodes = JSON.stringify(viewer.cyjsData.elements.nodes, null, '   ');

              viewer.prettyCyjsEdges = JSON.stringify(viewer.cyjsData.elements.edges, null, '   ');


              cyService.initCyGraph(cyService,cyjsData);

              /*
               // load data to cy-service
               cyService.setCyjsNetwork(cyjsData);
               */
              var cyObject = cyService.getCy();
              //viewer.hackCy(cyObject);

              cyObject.on('tap', 'node', function(){
                if (this.data('networkid')) {
                  var url = '/#/view/' + this.data('networkid');
                  console.log('opening url: ' + url);
                  try { // your browser may block popups
                    window.open(url);
                  } catch (e) { // fall back on url change
                    window.location.href = url;
                  }
                }
              });

            }
        ).error(
            function (error) {
              viewer.queryError = error;
              viewer.cyjsData = null;
              viewer.prettyCyjsData = null;
            }
        );
      }







    });
