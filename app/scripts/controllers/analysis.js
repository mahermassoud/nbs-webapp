'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:AnalysisCtrl
 * @description
 * # AnalysisCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp').controller('AnalysisCtrl',

    function ($scope, $http, sharedProperties) {

       $scope.rankedNetworksList = {};
       var rankedNetworksList = $scope.rankedNetworksList;
       rankedNetworksList.responseJSON = undefined;

       //rankedNetworksList.geneList = 'LAMB2, LAMB3, CD81, TSP2, TSP1, BRAF, UB2D3, EWS, CSTF1, CDK2';
       rankedNetworksList.geneList = 'AURKB, foo, BRCA1, PCNA, AKT1, ITGB2';

       $scope.submit = function() {

          var list = rankedNetworksList.geneList.split(',');

          for (var i = 0; i < list.length; i++) {
             list[i] = list[i].trim();
          }

          var myObj = {'ids': list, 'eset': 'rudi_test' };
          var myJsonString = JSON.stringify(myObj);

          var req = {
             'method': 'POST',
             'url': 'http://enrich.ndexbio.org/enrich/v1/api/esets/query',
             'headers': {
                'Content-Type': 'application/json'
             },
             'data': myJsonString
          };

          $http( req

          ).success(
              function( response ) {

                  rankedNetworksList.responseJSON = $scope.buildListOfEnrichedNetworks(response);
                  var responseScores = {};
                  responseScores = $scope.normalizeResponseScores(response.scores);
                  sharedProperties.setResponseScores(responseScores);

              }
          ).error (
             function( response ) {

                // process error here
                console.log(response);

             }
          );

       };

        $scope.normalizeResponseScores = function(scores) {
            var retScores = {};

            if (!scores) {
                return retScores;
            }

            for (var i = 0; i < scores.length; i++) {

                var scoresObj = scores[i];
                var key = scoresObj.set_id;

                if (!(key in retScores)) {
                    retScores[key] = scoresObj;
                }
            }

            return retScores;
        };

       $scope.clearInput = function() {
          delete rankedNetworksList.geneList;
          delete rankedNetworksList.responseJSON;
       };

       $scope.buildListOfEnrichedNetworks = function(response) {

           console.log('in buildListOfEnrichedNetworks');


          if ((!response) || (!response.scores)  || (response.scores.length === 0)) {
             return 'no networks found';
          }

          var list = '<br />';

          for (var i = 0; i < response.scores.length; i++) {
             var scoreEntry  = response.scores[i];
             var networkName = scoreEntry.set_name;
             var networkUUID = scoreEntry.set_id;
             var networkPV   = scoreEntry.pv;
             var networkOverlap = '';


             if (scoreEntry.overlap) {

                var allKeys = Object.keys(scoreEntry.overlap);

                for (var j = 0; j <  allKeys.length; j++) {

                   var value = allKeys[j];

                    var arrayOfOverlappedIDs = scoreEntry.overlap[value];

                    var stringOfOverlappedIDs = '';

                    for (var k = 0; k < arrayOfOverlappedIDs.length; k++) {
                        var overlappedID = arrayOfOverlappedIDs[k];

                        if (k > 0) {
                            stringOfOverlappedIDs = stringOfOverlappedIDs + ', ';
                        }
                        stringOfOverlappedIDs = stringOfOverlappedIDs + overlappedID;
                    }

                    if (j > 0) {
                        networkOverlap = networkOverlap + ', ';
                    }

                    networkOverlap = networkOverlap + value + '(IDs: ' + stringOfOverlappedIDs + ')';
                }
             }

             if (i > 0) {
                list = list + '<br /><br />';
             }

             list = list + '<strong>       PV : </strong>' + networkPV   + '<br />' +
                           '<strong>     Name : </strong>' + networkName + '<br />' +
                           '<strong>     UUID : </strong>' + networkUUID + '<br />' +

                           ((networkOverlap) ? ('<strong>  Overlap : </strong>' + networkOverlap + '<br />') : ('')) +
                           '<strong> Retrieve : </strong><a target="_blank" href="http://dev2.ndexbio.org/rest/network/' +
                                networkUUID + '/asCX">Get Network in CX format</a>' + '<br />' +

                           '<strong>Translate : </strong><a href="#/viewnicecx/' +
                                networkUUID + '">Translate network to Nice CX format</a>' + '<br />' +

                           '<strong>Visualize : </strong><a target="_blank" href="#/visualize/' + networkUUID + '">' +
                               'View Network</a>';
          }

          return list;
       };
   });
