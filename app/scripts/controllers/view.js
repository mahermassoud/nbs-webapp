'use strict';

/**
 * @ngdoc function
 * @name ndexCravatWebappApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the ndexCravatWebappApp
 */
angular.module('ndexCravatWebappApp')
  .controller('ViewCtrl', ['$http', '$scope', '$routeParams', 'cyService', function ($http, $scope, $routeParams, cyService) {

    $scope.viewer = {};

    var viewer = $scope.viewer;

    viewer.foo = 'Test variable';

    // Hardwire network ID on dev2. Must be a public network.
    viewer.networkUUID = '41dba984-e7e5-11e5-9c03-0660b7976219';
    if ($routeParams.networkId) {
      viewer.networkUUID = $routeParams.networkId;
    }

    console.log('view controller starting');

    // http://ci-dev-serv.ucsd.edu:3001/ndex2cyjs/bf47d97a-e231-11e5-be28-0660b7976219

    // Hardwire Kei's service endpoint
    viewer.ndex2cyjsEndpoint = 'http://ci-dev-serv.ucsd.edu:3001/ndex2cyjs/';



    //viewer.networkUUID = '181f3b75-e620-11e5-8c14-0660b7976219';

    viewer.cyjsURL = viewer.ndex2cyjsEndpoint + viewer.networkUUID;

    viewer.queryError = null;
    viewer.cyjsData = null;
    viewer.prettyCyjsData = 'waiting for response';

    viewer.hackCyjsData = function(){
      //var nodes = viewer.cyjsData.elements.nodes;
      ///var firstNode = nodes[0];
      //firstNode.data.input = 'TRUE';
      //firstNode.data.href = 'http:www.ndexbio.org';

      var style = viewer.cyjsData.style;

      var nodeStyleCSS = style[0].css;

      nodeStyleCSS.content = nodeStyleCSS.contents;
    };

    /*
    viewer.hackCy = function(cyObject){
      cyObject.nodes().forEach(function(n){

        var myContent = ['<a target="_blank" href="http:www.ndexbio.org">ndex</a>'];
        /*
         content: [
         {
         name: 'GeneCard',
         url: 'http://www.genecards.org'
         },
         {
         name: 'UniProt search',
         url: 'http://www.uniprot.org/uniprot'
         },
         {
         name: 'GeneMANIA',
         url: 'http://genemania.org'
         }
         ].map(function( link ){
         return '<a target="_blank" href="' + link.url + '">' + link.name + '</a>';
         }).join('<br />\n')
         *

        n.qtip({
          content: myContent,
          position: {
            my: 'top center',
            at: 'bottom center'
          },
          style: {
            //classes: 'qtip-bootstrap',
            tip: {
              width: 16,
              height: 8
            }
          }
        });
      });
    };
    */

    // http://ci-dev-serv.ucsd.edu:3001/ndex2cyjs/bf47d97a-e231-11e5-be28-0660b7976219

    if (viewer.cyjsURL) {

      cyService.initCyGraph();

      $http.get(viewer.cyjsURL)
        .success(
        function (cyjsData) {
          viewer.cyjsData = cyjsData;

          viewer.queryError = null;

          viewer.hackCyjsData();

          viewer.prettyCyjsStyle = JSON.stringify(viewer.cyjsData.style, null,'   ');

          viewer.prettyCyjsNodes = JSON.stringify(viewer.cyjsData.elements.nodes, null,'   ');

          viewer.prettyCyjsEdges = JSON.stringify(viewer.cyjsData.elements.edges, null,'   ');

          // load data to cy-service
          cyService.setCyjsNetwork(cyjsData);

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


  }]);
