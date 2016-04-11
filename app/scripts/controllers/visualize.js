'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:VisualizeCtrl
 * @description
 * # VisualizeCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('VisualizeCtrl', function ($routeParams, $http, $scope, cyService, webServices, utils, cxNetworkUtils) {

    var networkUUID = $routeParams.networkUUID;


    $scope.visualizer = {};
    var visualizer = $scope.visualizer;

    visualizer.errorMessage = null;

    var req = {
      'method': 'GET',
      'url': webServices.getDev2NdexBioServiceURL() + '/' + networkUUID + '/asCX'
    };

    $http(req
    ).success(
      function (response) {

        // response is a CX network
        // First convert it to niceCX to make it easy to update attributes
        var niceCX = cxNetworkUtils.rawCXtoNiceCX(response);

        console.log(niceCX);
        console.log(networkUUID);

        // add 'inQuery' : 'true' to nodes that link to terms (genes) in the enrichment query
        utils.markInQueryNodes(niceCX, networkUUID);

        // attributeNameMap maps attribute names in niceCX to attribute names in cyjs.
        //
        // In some cases, such as 'id', 'source', and 'target', cyjs uses reserved names and
        // any attribute names that conflict with those reserved names must be mapped to other values.
        //
        // Also, cyjs requires that attribute names avoid special characters, so cx attribute names with
        // non-alpha numeric characters must also be transformed and mapped.
        //
        var attributeNameMap = {};

        /*----------------------------------

         Elements

         ----------------------------------*/

        var cyElements = cyService.cyElementsFromNiceCX(niceCX, attributeNameMap);

        console.log(cyElements);

        console.log(attributeNameMap);

        /*----------------------------------

         Style

         ----------------------------------*/

        // For the moment, we will *not* try to parse CX to get styling information.
        // (waiting on service or library from Cytoscape group)
        //
        // Instead...
        // the ndex-cravat-webapp will apply a style designed to
        // highlight selected attributes in our nodes and edges.
        // This can then evolve to the app providing multiple styles and enabling the user to switch styles dynamically.

        // Stub of service converting style information
        //var cyStyle = cyService.cyStyleFromNiceCX(niceCX, attributeNameMap);
        //if (!cyStyle){
        //  cyStyle = cyService.getDefaultStyle();
        //}

        /*

          Note from Cytoscape.js documentation:
         "For simplicity and ease of use, specificity rules are completely ignored in stylesheets.
         For a given style property for a given element, the last matching selector wins."

         */

        const CRAVAT_VISUAL_STYLE = [
          {
            selector: 'node',
            style: {
              'background-color': 'rgb(0, 220, 200)',
              'background-opacity': 0.8,
              'width': '40px',
              'height': '40px',
              'label': 'data(name)',
              'font-family': 'Roboto, sans-serif'
            }
          },
          {
            selector: 'edge',
            style: {
              'line-color': '#aaaaaa',
              'width': '2px',
              'label': 'data(interaction)',
              'font-family': 'Roboto, sans-serif',
              'text-opacity': 0.8
            }
          },
          {
            selector: 'node:selected',
            style: {
              'background-color': 'yellow'
            }
          },
          {
            selector: 'edge:selected',
            style: {
              'line-color': 'yellow',
              'width': 6
            }
          },
          {
            selector: 'node[inQuery = "true"]',
            style: {
              'background-color': 'red'
            }
          }
        ];

        /*----------------------------------

        Layout

         ----------------------------------*/

        //var modifiedCX = cxNetworkUtils.niceCXToRawCX(niceCX);
        var layoutName = 'cose';

        if (cyService.allNodesHaveUniquePositions(cyElements)){
          layoutName = 'preset';
        }

        var cyLayout = {name: layoutName};

        cyService.initCyGraphFromCyjsComponents(cyElements, cyLayout, CRAVAT_VISUAL_STYLE);

        /*----------------------------------

         For debugging

         ----------------------------------*/

        console.log(cyService.getCy());

/*
        var URL = webServices.getCx2CyJsServiceURL();


        req = {
          'method': 'POST',
          'url': URL,
          data: angular.toJson(originalCX),

          'headers': {
            'Content-Type': 'application/json'
          }
        };


        $http(req
        ).success(
          function (response) {

            //console.log(JSON.stringify(response));

            $scope.visualizeNetwork(response);
          }
        ).error(
          function (response) {

            console.log('Error querying cx2cys: ' + JSON.stringify(response));

            visualizer.errorMessage = 'Unable to convert Network in JSON to CYJS using<br /><br /> <strong>' +
              webServices.getCx2CyJsServiceURL() +
              '</strong> <br /><br />received this error : ' + JSON.stringify(response);

          }
        );
*/
      }
    ).error(
      function (response) {

        //console.log(JSON.stringify(response));

        console.log('Error querying NDEx: ' + JSON.stringify(response));

      }
    );


  });
