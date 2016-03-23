'use strict';

/**
 * @ngdoc service
 * @name ndexCravatWebappApp.cyService
 * @description
 * # cyService
 * Service in the ndexCravatWebappApp.
 */
angular.module('ndexCravatWebappApp')
  .factory('cyService', ['$q', function ($q) {

    // Public API here: the factory object will be returned
    var factory = {};
    var cy;

    // Original position will be used when layout positions are available
    const DEF_LAYOUT = 'preset';

    // Layout to be used when there is no layout information
    const DEF_NO_LAYOUT = 'cose';


    const DEF_VISUAL_STYLE = [
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
          'width': 1,
          'label': 'data(interaction)',
          'font-size': '0.15em',
          'font-family': 'Roboto, sans-serif',
          'text-opacity': 0.5
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
      }
    ];
    /*-----------------------------------------------------------------------*
     * initialize the cytoscape instance
     *-----------------------------------------------------------------------*/
    factory.initCyGraph = function (cyService, cyjsData) {
      var deferred = $q.defer();


      // elements
      var eles = [
        { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
        { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
        { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
      ];

      $(function () { // on dom ready

        cy = cytoscape({
          container: document.getElementById('cytoscape-canvas'),

          style: DEF_VISUAL_STYLE,


          layout: {
            name: 'cose',
            padding: 10
          },

          elements: eles,

          ready: function () {
            deferred.resolve(this);
            // load data to cy-service
            cyService.setCyjsNetwork(cyjsData);

          }
        });

      }); // on dom ready

      return deferred.promise;
    };


    /*-----------------------------------------------------------------------*
     * Set a cyjs network to be displayed in the viewer
     *-----------------------------------------------------------------------*/


    factory.setCyjsNetwork = function (cyjsNetwork) {

      console.log('about to set style and layout');

      var layout = DEF_LAYOUT;
      var visualStyle = cyjsNetwork.style;

      if(visualStyle === undefined || visualStyle === null) {
        visualStyle = DEF_VISUAL_STYLE;
        layout = DEF_NO_LAYOUT;
      }

      cy.style(visualStyle);

      cy.layout({name: layout});

      // set the cytoscsape instance elements
      console.log('about to load elements');
      cy.add(cyjsNetwork.elements);

    };

    factory.getCy = function(){
      return cy;
    };


    return factory;

  }]);
