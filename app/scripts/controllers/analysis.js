'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:AnalysisCtrl
 * @description
 * # AnalysisCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp').controller('AnalysisCtrl',

    function ($scope, $http, sharedProperties, webServices) {

       $scope.rankedNetworksList = {};
       var rankedNetworksList = $scope.rankedNetworksList;
       rankedNetworksList.responseJSON = undefined;

       //rankedNetworksList.geneList = 'LAMB2, LAMB3, CD81, TSP2, TSP1, BRAF, UB2D3, EWS, CSTF1, CDK2';
       // auto init textbox to contain these :: analysis.html line 15
       rankedNetworksList.geneList = 'AURKB, BRCA1, PCNA, AKT1, ITGB2';

        // eSets should be filled dynamically
       rankedNetworksList.eSets = ['cravat_nci', 'rudi_test'];
       rankedNetworksList.eSetSelected = rankedNetworksList.eSets[0];

       $scope.submit = function() {

          // Split and trim rankedNetworkList inputs
          var list = rankedNetworksList.geneList.split(',');
          for (var i = 0; i < list.length; i++) {
             list[i] = list[i].trim();
          }
           
          var myObj = {'ids': list, 'eset': rankedNetworksList.eSetSelected };

          var myJsonString = JSON.stringify(myObj);

          var req = {
             'method': 'POST',
             // webServices is parameter to this function, all webServices does is return a string
             'url': webServices.getEnrichmentServiceURL(),
             'headers': {
                'Content-Type': 'application/json'
             },
             'data': myJsonString
          };

          // http is also param
          $http( req

          ).success(
              function( response ) {

                  // same file line 98
                  rankedNetworksList.responseJSON = $scope.buildListOfEnrichedNetworks(response);
                  var responseScores = $scope.normalizeResponseScores(response.scores);
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
          rankedNetworksList.eSetSelected = rankedNetworksList.eSets[0];
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

     ((networkOverlap) ? ( '<strong>  Overlap : </strong>' + networkOverlap + '<br />') : ('')) +


                     //      '<strong>          Retrieve : </strong><a target="_blank" href="http://dev2.ndexbio.org/rest/network/' +
                     //           networkUUID + '/asCX">Get Network in CX format</a>' + '<br />' +

                    //       '<strong>         Translate : </strong><a  target="_blank" href="#/viewnicecx/' +
                    //            networkUUID + '">Translate network to Nice CX format</a>' + '<br />' +

                    //       '<strong>        Mark Nodes : </strong><a target="_blank" href="#/markNiceCX/' +
                    //            networkUUID + '">Mark inQuery Nodes in Nice CX </a>' + '<br />' +

                    //       '<strong> Nice CX -> Raw CX : </strong><a target="_blank" href="#/niceCXtoRawCX/' +
                    //            networkUUID + '">Translate Nice CX with Marked Nodes back to Raw CX </a>' + '<br />' +

                   //        '<strong>Visualize Original : </strong><a target="_blank" href="#/visualizeOriginal/' + networkUUID + '">' +
                   //            'View Original Network</a>' + '<br />' +

                           '<strong>Visualize : </strong><a target="_blank" href="#/visualizeEnriched/' + networkUUID + '">' +
                               'View Network</a>';
          }

          return list;
       };
   });
