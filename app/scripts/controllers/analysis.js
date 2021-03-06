'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:AnalysisCtrl
 * @description
 * # AnalysisCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp').controller('AnalysisCtrl',

    function ($scope, $http, sharedProperties, webServices, fileInputService) {

      // Read in tsv files as adjacency key value pairs patientID:list<geneIDs>
      // where geneIDs are mutations for that patient

      // Filename of TCGA mutation tsv stored on local machine
      var TCGA_MUT = "test_files/NBS1_TCGA_binGeno.csv";

       $scope.rankedNetworksList = {};
       var rankedNetworksList = $scope.rankedNetworksList;
       rankedNetworksList.responseJSON = undefined;

       // auto init textbox to contain these
       rankedNetworksList.geneList = 'TTN, CACNA1A, RIMS1';

        // eSets should be filled dynamically
        // Select which network to search
       rankedNetworksList.eSets = ['Ovarian Cancer'];
       rankedNetworksList.eSetSelected = rankedNetworksList.eSets[0];

        $scope.fileContent = undefined;
        $scope.fileContentInJSON = undefined;
        $scope.uploadedFileName = undefined;
        $scope.currentCravatFileName = sharedProperties.getCravatFileName();

         // Function ran when submit is clicked
        $scope.submit = function() {

          // Split and trim rankedNetworkList inputs
          var list = rankedNetworksList.geneList.split(',');
          for (var i = 0; i < list.length; i++) {
             list[i] = list[i].trim();
          }

          var myObj = {'ids': list, 'eset': rankedNetworksList.eSetSelected};

          // Holds selection from drop down
          var myJsonString = JSON.stringify(myObj);

          // if we are using vlad's networks
          if(rankedNetworksList.eSetSelected != "Ovarian Cancer") {

            // HTTP header for request to enrichment service
            var req = {
              'method': 'POST',
              // webServices is parameter to this function, all webServices does is return a string
              'url': webServices.getEnrichmentServiceURL(),
              'headers': {
                'Content-Type': 'application/json'
              },
              'data': myJsonString
            };


            // make POST request to enrichment service with given gene_ids and network to search
            // list of networks is returned with scores (marked as PV) in output
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
          }
          // else, we are using Massoud's nbs app
          else {
            // random UUID for testing purposes
            var SAMPLE_UUID = "8a047651-0bd0-11e6-b550-06603eb7f303";

            // Save query for retrieval by visualizeEnriched service
            sharedProperties.setQueryNames(list);

            var vizLink = '<a target="blank" href="#/visualizeEnriched/' + SAMPLE_UUID +
              '">View Network</a>';
            rankedNetworksList.responseJSON = vizLink;

          }



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

        $scope.normalizeArrayOfGenes = function(arrayOfGenes, key) {
            var mapOfGenes = {};

            if (!arrayOfGenes) {
                return mapOfGenes;
            }

            for (var i = 0; i < arrayOfGenes.length; i++) {

                var entry = arrayOfGenes[i];

                if (key in entry) {
                    mapOfGenes[entry[key]] = entry;
                }
            }

            return mapOfGenes;
        };

      // Code for clear button on main page
       $scope.clearInput = function() {
          rankedNetworksList.geneList = undefined;
          rankedNetworksList.responseJSON = undefined;
          rankedNetworksList.eSetSelected = rankedNetworksList.eSets[0];
       };

        $scope.clearFileContent = function() {
            $scope.fileContent = undefined;
            $scope.fileContentInJSON = undefined;
            $scope.uploadedFileName = undefined;
        };

        $scope.unloadCravatData = function() {
            sharedProperties.removeItemFromSessionStorage('cravatFileName');
            sharedProperties.removeItemFromSessionStorage('cravatData');
            $scope.currentCravatFileName = sharedProperties.getCravatFileName();
        };

      // Takes response from POST request to enrichment service and returns a list object that represents enriched
      // network, including name, UUID, Overlap etc
       $scope.buildListOfEnrichedNetworks = function(response) {

           //console.log('in buildListOfEnrichedNetworks');

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

             list = list + '<strong>                PV : </strong>' + networkPV   + '<br />' +
                           '<strong>              Name : </strong>' + networkName + '<br />' +
                           '<strong>              UUID : </strong>' + networkUUID + '<br />' +

     ((networkOverlap) ? ( '<strong>           Overlap : </strong>' + networkOverlap + '<br />') : ('')) +


//                           '<strong>          Retrieve : </strong><a target="_blank" href="http://dev2.ndexbio.org/rest/network/' +
//                                networkUUID + '/asCX">Get Network in CX format</a>' + '<br />' +

//                           '<strong>         Translate : </strong><a target="_blank" href="#/viewnicecx/' +
//                                networkUUID + '">Translate network to Nice CX format</a>' + '<br />' +

//                           '<strong>        Mark Nodes : </strong><a target="_blank" href="#/markNiceCX/' +
//                                networkUUID + '">Mark inQuery Nodes in Nice CX </a>' + '<br />' +

//                           '<strong> Nice CX -> Raw CX : </strong><a target="_blank" href="#/niceCXtoRawCX/' +
//                                networkUUID + '">Translate Nice CX with Marked Nodes back to Raw CX </a>' + '<br />' +

                   //        '<strong>Visualize Original : </strong><a target="_blank" href="#/visualizeOriginal/' + networkUUID + '">' +
                   //            'View Original Network</a>' + '<br />' +
                            // target=_blank makes it so new tab opens
                           '<strong>         Visualize : </strong><a href="#/visualizeEnriched/' + networkUUID + '">' +
                               'View Network</a>';
          }

          return list;
       };

        $scope.onFileUpload = function (inputElement) {
            $scope.$apply(function () {
                var file = inputElement.files[0];

                // clear a file input name from Angular JS ; we need to clear it
                // because Chrome (unlike FireFox) will not load the same file 2 times in row
                // unless we set the input element value to null
                angular.element(inputElement).val(null);

                fileInputService.readFileAsync(file).then(function (fileInputContent) {

                    $scope.fileContent = fileInputContent;

                    // find where actual CRAVAT data begins... it begins with the "HUGO symbol" substring
                    var index = fileInputContent.toLowerCase().indexOf('hugo symbol');

                    if (index < 0) {
                        $scope.fileContentInJSON = undefined;
                        return;
                    }

                    // this is part of Cravat TSV file stripped off the headers that begins with "HUGO symbol"
                    // string which is header of the first column
                    var cravatPureData = fileInputContent.substring(index);
                    var d3ParsedArray = d3.tsv.parse(cravatPureData);


                    // use Lodash function _.map() to get values of 'HUGO symbol' key from all objects in d3ParsedArray.
                    // This gives us array of genes.
                    var arrayOfGenes = _.map(d3ParsedArray, 'HUGO symbol');

                    // initialize Find Related Networks by Gene List panel with the genes extracted from CRAVAT file
                    var resultString = arrayOfGenes.toString();
                    rankedNetworksList.geneList = resultString;


                    // translate array of genes to map of genes with "HUGO symbol" values as keys
                    var mapOfGenes = $scope.normalizeArrayOfGenes(d3ParsedArray, 'HUGO symbol');
                    sharedProperties.setCravatData(mapOfGenes);

                    sharedProperties.setCravatFileName(file.name);
                    $scope.currentCravatFileName = sharedProperties.getCravatFileName();

                    $scope.fileContentInJSON = JSON.stringify(mapOfGenes, null, 3);

                    $scope.submit();
                });

                $scope.uploadedFileName = file.name;

            });
        };

      /**
       * Function called when "Load starter csv files" button is clicked
       * @param inputElement
         */
      $scope.onStartFileUpload = function (inputElement) {
        $scope.$apply(function () {
          var file = inputElement.files[0];

          // clear a file input name from Angular JS ; we need to clear it
          // because Chrome (unlike FireFox) will not load the same file 2 times in row
          // unless we set the input element value to null
          angular.element(inputElement).val(null);

          fileInputService.readFileAsync(file).then(function (fileInputContent) {

            $scope.fileContent = fileInputContent;

            var d3ParsedArray = d3.tsv.parse(fileInputContent);

            $scope.startFileContent = d3ParsedArray;


            $scope.submit();
          });

          $scope.uploadedFileName = file.name;

        });

      };

   });
