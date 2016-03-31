'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:AnalysisCtrl
 * @description
 * # AnalysisCtrl
 * Controller of the ndexCravatWebappApp
 */
/*
ndexApp.controller('userController',
    ['ndexService', 'ndexUtility', 'sharedProperties', '$scope', '$location', '$routeParams', '$route', '$modal',
        function (ndexService, ndexUtility, sharedProperties, $scope, $location, $routeParams, $route, $modal)
*/

angular.module('ndexCravatWebappApp').controller('AnalysisCtrl', ['$scope', '$http',

    function ($scope, $http) {

       $scope.rankedNetworksList = {};
       var rankedNetworksList = $scope.rankedNetworksList;
       rankedNetworksList.responseJSON = undefined;

       rankedNetworksList.geneList = 'LAMB2, LAMB3, CD81, TSP2, TSP1, BRAF, UB2D3, EWS, CSTF1, CDK2'; //undefined;

       $scope.submit = function() {

          var list = rankedNetworksList.geneList.split(',');

          for (var i = 0; i < list.length; i++) {
             list[i] = list[i].trim();
          }

          //r = 'DEFGHIJKLMNOP10';
          //rankedNetworksList.responseJSON = 'Response Has changed in submit()! Hurraaaah!';

          //console.log('in submit: rankedNetworksList.responseJSON = ' + rankedNetworksList.responseJSON);
          //console.log('in submit: rankedNetworksList.geneList = ' + rankedNetworksList.geneList);
          //console.log('in submit: list.length = ' + list.length);


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


                 rankedNetworksList.responseJSON = $scope.buildListOfEnrichedNetworks(response);
                 //JSON.stringify(response, null, '   ').trim();

                 console.log('received success, response=' + response);
                 //console.log('rankedNetworksList.responseJSON = ' + rankedNetworksList.responseJSON);
              }
          ).error (
             function( response ) {
                console.log('received error ' + response);
                //rankedNetworksList.responseJSON = "GHI";
                $scope.rankedNetworksList = 'GHI';
                //$scope.$apply();
                // var r = 10;
             }
          );

       };

       $scope.clearInput = function() {
          delete rankedNetworksList.geneList;
          delete rankedNetworksList.responseJSON;

          //rankedNetworksList.responseJSON = 'just cleared contents';
          //console.log('in clear: rankedNetworksList.responseJSON = ' + rankedNetworksList.responseJSON);
       };

       $scope.buildListOfEnrichedNetworks = function(response) {

          if ((!response) || (!response.scores)  || (response.scores.length === 0)) {
             return 'no networks found';
          }

          var list = '<br />';

          for (var i = 0; i < response.scores.length; i++) {
             var scoreEntry  = response.scores[i];
             var networkName = scoreEntry.set_name;
             var networkUUID = scoreEntry.set_id;
             var networkPV   = scoreEntry.pv;
             var networkOverlap;

             if (scoreEntry.overlap) {
                for (var j = 0; j < scoreEntry.overlap.length; j++) {
                   networkOverlap = (networkOverlap) ?
                       (networkOverlap + ', ' + scoreEntry.overlap[j]) :
                       (scoreEntry.overlap[j]);
                }
             }

             if ( i > 0) {
                list = list + '<br /><br />';
             }

             list = list + '<strong>       PV : </strong>' + networkPV   + '<br />' +
                           '<strong>     Name : </strong>' + networkName + '<br />' +
                           '<strong>     UUID : </strong>' + networkUUID + '<br />' +
                           ((networkOverlap) ? ('<strong>  Overlap : </strong>' + networkOverlap + '<br />') : ('')) +
                           '<strong> Retrieve : </strong><a target="_blank" href="http://dev2.ndexbio.org/rest/network/' + networkUUID + '/asCX">Get Network in CX format</a>';
          }

          return list;
       };

   }]);
