'use strict';

/**
 * @ngdoc service
 * @name ndexCravatWebappApp.cyService
 * @description
 * # cyService
 * Service in the ndexCravatWebappApp.
 */
angular.module('ndexCravatWebappApp')
    .factory('cyService', ['$q',  function ($q) {

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
        }
      ];
      
      // Style applied to nodes that are highlighted, should be the same as DEF_VISUAL_STYLE except "background-color"
      const NODE_HIGHLIGHT_STYLE = [
        
      ]

      factory.getDefaultStyle = function(){
        return DEF_VISUAL_STYLE;
      };

      var getCyAttributeName = function(attributeName, attributeNameMap){

        var cyAttributeName = attributeNameMap[attributeName];

        // handle attribute names that conflict with reserved names used by cyjs

        // The attributeNameMap maps attribute names in niceCX to attribute names in cyjs.
        // In some cases, such as 'id', 'source', and 'target', cyjs uses reserved names and
        // any attribute names that conflict must be mapped.
        // Also, cyjs requires that attribute names avoid special characters, so names with
        // special characters must be transformed and mapped.

        // This function updates the attributeNameMap if a new mapping is required

        if (!cyAttributeName){
          attributeNameMap[attributeName] = attributeName; // direct mapping
          cyAttributeName = attributeName;
        }

        return cyAttributeName;

      };

      factory.cyElementsFromNiceCX = function(niceCX, attributeNameMap){

        var elements = {};

        var nodeList = [];
        var nodeMap = {};
        var edgeList = [];
        var edgeMap = {};

        elements.nodes = nodeList;
        elements.edges = edgeList;

        // handle node aspect
        if (niceCX.nodes){
          _.forEach(niceCX.nodes.elements, function(nodeElement){
            var cxNodeId = nodeElement['@id'];
            var nodeData = {'id': cxNodeId};
            if (nodeElement.n){
              nodeData['name'] = nodeElement.n;
            }
            if (nodeElement.r){
              nodeData.represents = nodeElement.r;
            }
            nodeMap[cxNodeId] = {data: nodeData};
          });
        }

        // handle nodeAttributes aspect
        // Note that nodeAttributes elements are handled specially in niceCX as a map of maps!!
        if (niceCX.nodeAttributes){
          // for each node id
          _.forEach(niceCX.nodeAttributes.nodes, function(nodeAttributeMap, nodeId){
            var node = nodeMap[nodeId];
            if (node){
              _.forEach(nodeAttributeMap, function(attributeObject, attributeName){
                var cyAttributeName = getCyAttributeName(attributeName, attributeNameMap);
                // todo: parse value according to datatype
                node.data[cyAttributeName] = attributeObject.v;
              });
            }
          });
        }

        // handle cartesianCoordinates aspect
        if (niceCX.cartesianLayout){
          _.forEach(niceCX.cartesianLayout.elements, function(element){
            var nodeId = element.node;
            var node = nodeMap[nodeId];
            node.position = {x: element.x, y: element.y};
          });
        }

        // handle edge aspect
        if (niceCX.edges){
          _.forEach(niceCX.edges.elements, function(element){
            var cxEdgeId = element['@id'];
            var edgeData = {
              id : cxEdgeId,
              source: element.s,
              target: element.t};

            if (element.i){
              edgeData.interaction = element.i;
            }

            edgeMap[cxEdgeId] = {data: edgeData};
          });
        }

        // handle edgeAttributes aspect
        // Note that edgeAttributes elements are just in a list in niceCX for the moment!!
        if (niceCX.edgeAttributes){
          _.forEach(niceCX.edgeAttributes.elements, function(element){
            var edgeId = element.po;
            var edge = edgeMap[edgeId];
            var cyAttributeName = getCyAttributeName(element.n, attributeNameMap);
            // todo: parse value according to datatype
            edge.data[cyAttributeName] = element.v;
          });
        }

        // output the nodeMap to the nodeList
        _.forEach(nodeMap, function(node){
          nodeList.push(node);
        });

        // output the edgeMap to the edgeList
        _.forEach(edgeMap, function(edge){
          edgeList.push(edge);
        });

        return elements;

        // #10 Need to Override ID if exists
        //​ *ID*​ has a special meaning in Cytoscape.js and if such attribute is available in CX, it should be replaced to something else.
        // This should be handled carefully because it breaks graph topology if not correctly converted.

        /*

         #15 Implement object position parser and serializer
         Cytoscape uses a special parser/serializer for object position (mainly for label position).  Need to design and implement such function in this converter to handle label positions.


         #16 Replace invalid characters in column names

         This should be done in both attribute names ​_and_​ controlling attribute name in style object.

         replaceInvalid = regexp.MustCompile(`^[^a-zA-Z_]+|[^a-zA-Z_0-9]+`)

         In JavaScript, some of the characters has special meanings.  For example, '.' is used to specify properties of an object, like:

         ```var label = node.label;
         ```

         If CX contains attribute names containing such characters, it breaks Cytoscape.js.  The converter find and replace all of them before converting the actual data.
         */

        /*

         #21 Use only one conversion scheme for numbers
         Somehow Cytoscape.js can handle both of the following:

         ```{
         "selector": "node[degreelayout = 63.0]",
         "css": {
         "width": "50"
         }
         },

         {
         "selector": "node[degreelayout = 63.0]",
         "css": {
         "width": 50
         }
         },
         ```

         But this is really confusing when debugging styles.  We should use only one conversion scheme for numbers.

         */

      };

      factory.cyStyleFromNiceCX = function(niceCX, attributeNameMap){
        console.log('style from niceCX: ' + niceCX.length + ' ' + attributeNameMap.length);
        //#7 Opacity conversion
        //Need to convert from 0-255 to 0-1.

        // #8 Value Converter for Discrete Mapping
        // Discrete mapping converter should use appropriate value converters just like default selectors.

        // #9 Label Position handling
        // Current version of Cytoscape.js uses [TOP/CENTER] as a default value.  This should be replaced to [CENTER/CENTER].

/*        #12 Selected Node/Edge default value handler
        In Cytoscape, there are selected node/edge color visual property, but there is no such thing in Cytoscape.js.  We need to convert default value of selected colors into special CSS Selector, like:

        ```"selector": "node:selected",
"css": {
    "background-color": "#0033CC"


 #13 Locked Visual Properties are not handled properly
 VP lock is not handled in current version.
 Need to design and implement such function in Style converter.  Two main lockings are:

 • Size
 • Arrow Color

 #14 Filter / Ignore unused Visual Properties
 CX file contains a lot of incompatible, unused Visual Properties.  Need to properly ignore them.  Otherwise, some side-effect happens in style conversion process.
}*/
        /*

         #17 Bypass support
         Currently, conversion result is unpredictable if Bypass is set in a Style.  Need to handle this as a special case for selector converter.

         #18 Passthrough mapping conversion is incomplete
         In Cytoscape, Passthrough mapping supports various data types, including numbers, custom graphics, and labels.  Currently, this Style converter only supports labels.  Need to add support for other data types.

         */

        /*

         #19 Add Custom Graphics Support
         Cytoscape.js has an easy-to-use data mapper function from URL to images on nodes:

         https://gist.github.com/maxkfranz/aedff159b0df05ccfaa5

         This can be done by supporting discrete/passthrough mapping, but not implemented.  We need to add support for this type of mappings.


         #22 Handle text wrapping and LABEL_WIDTH visual property
         Cytoscape supports LABEL_WIDTH visual property to limit the width of labels.  And Cytoscape.js supports similar property ​_text-max-width_​.  But currently these are simply ignored and always render very long label if text length is long.

         The Style converter should support this visual property.


         #23 Implement workaround for NODE_SIZE defaults and mappings
         Current converter cannot handle NODE_SIZE because it depends on visual property locks.

         Before implementing complete lock handler, we need to implement some workaround to handle size.

         */
        return false;
      };

      factory.allNodesHaveUniquePositions = function(cyElements){
        var nodePositionMap = {};
        var nodes = cyElements.nodes;
        for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++){
          var node = nodes[nodeIndex];
          var position = node.position;
          if (!position){
            // found a node without a position so we return false
            return false;
          }
          var positionKey = position.x + '_' + position.y;
          if (nodePositionMap[positionKey]){
            // found a duplicate position so we return false
            return false;
          } else {
            // add this position to the map
            nodePositionMap[positionKey] = position;
          }

        }
        return true;

      };

      /*-----------------------------------------------------------------------*
       * initialize the cytoscape instance from cyjsData
       *-----------------------------------------------------------------------*/
      factory.initCyGraph = function (cyjsData) {

        var deferred = $q.defer();

        var layoutName = DEF_LAYOUT;
        var visualStyle = cyjsData.style;

        if(visualStyle === undefined || visualStyle === null) {
          visualStyle = DEF_VISUAL_STYLE;
          layoutName = DEF_NO_LAYOUT;
        }

        var cyLayout = {name: layoutName};


        // elements
        /*
         var eles = [
         { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
         { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
         { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
         ];
         */

        $(function () { // on dom ready

          cy = cytoscape({
            container: document.getElementById('cytoscape-canvas'),

            style: visualStyle,

            layout: cyLayout,

            elements: cyjsData.elements,

            ready: function () {
              deferred.resolve(this);
              // load data to cy-service
              //this.setCyjsNetwork(cyjsData);
            }
          });

        }); // on dom ready

        return deferred.promise;
      };

      /*-----------------------------------------------------------------------*
       * initialize the cytoscape instance from niceCX
       *-----------------------------------------------------------------------*/
      factory.initCyGraphFromCyjsComponents = function (cyElements, cyLayout, cyStyle) {

        var deferred = $q.defer();

        $(function () { // on dom ready

          cy = cytoscape({
            container: document.getElementById('cytoscape-canvas'),

            style: cyStyle,

            layout: cyLayout,

            elements: cyElements,

            ready: function () {
              deferred.resolve(this);
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
        //cy.add(cyjsNetwork.elements);

      };

      /*-----------------------------------------------------------------------*
       * Returns cy object
       *-----------------------------------------------------------------------*/
      factory.getCy = function(){
        return cy;
      };

      /**
       * Takes in a list of node LABELS and highlights them by 
       * setting their style to NODE_HIGHLIGHT_STYLE
       * (NODE_HIGHLIGHT_STYLE) is the same as default style except it has a different
       * body color
       * @param nodesToHighlight list of names of nodes that we want to hilight
       */
      factory.highlightNodes = function(nodesToHighlight) {

      }

      return factory;

    }]);

