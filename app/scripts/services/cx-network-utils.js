'use strict';

/**
 * @ngdoc service
 * @name ndexCravatWebappApp.cxNetworkUtils
 * @description
 * # cxNetworkUtils
 * Service in the ndexCravatWebappApp.
 */
angular.module('ndexCravatWebappApp')
  .service('cxNetworkUtils', function () {
      // AngularJS will instantiate a singleton by calling "new" on this function

      this.rawCXtoNiceCX = function(rawCX) {

          var niceCX = {};

          console.log('in rawCXtoNiceCX');

          rawCX = JSON.parse(JSON.stringify(rawCX));

          for (var i = 0; i < rawCX.length; i++) {
              var fragment = rawCX[i];
              if (fragment) {
                  var aspectName;
                  for (aspectName in fragment) {
                      var elements = fragment[aspectName];
                      for (var j = 0; j < elements.length; j++) {
                          var element = elements[j];
                          handleCxElement(aspectName, element, niceCX);
                      }
                  }
              }
          }


          return niceCX;
      };

      var handleCxElement = function (aspectName, element, niceCX) {

          console.log('aspect ' + aspectName);

          var aspect = niceCX[aspectName];


          if (aspectName === 'nodeAttributes') {

              if (!aspect) {
                  // add aspect to niceCX
                  aspect = {nodes: {}};

                  niceCX[aspectName] = aspect;
              }

              var nodeMap = aspect.nodes;

              var attributes = nodeMap[element.po];

              if(!attributes){
                  attributes = {};
                  nodeMap[element.po] = attributes;
              }

              attributes[element.n] = element.v;


          } else  {
              // opaque for now

              if (!aspect) {
                  // add aspect to niceCX
                  aspect = {elements: []};

                  niceCX[aspectName] = aspect;
              }

              var elementList = aspect.elements;

              elementList.push(element);

          }
      };

    });
