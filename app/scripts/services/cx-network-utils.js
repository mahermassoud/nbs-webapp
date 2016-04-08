'use strict';

/**
 * @ngdoc service
 * @name ndexCravatWebappApp.cxNetworkUtils
 * @description
 * # cxNetworkUtils
 * Service in the ndexCravatWebappApp.
 */
angular.module('ndexCravatWebappApp')
  .service('cxNetworkUtils', function (sharedProperties) {
      // AngularJS will instantiate a singleton by calling "new" on this function

      this.rawCXtoNiceCX = function(rawCX, networkUUID) {

          var niceCX = {};
          var metadata1 = [];
          var metadata2 = [];
          var numberVerification = [];
          var status;

          console.log('in rawCXtoNiceCX');

          rawCX = JSON.parse(JSON.stringify(rawCX));

          var responseScores = sharedProperties.getResponseScores(networkUUID);

          var overlappedIDs = [];
          if (responseScores && responseScores.overlap) {
              for (var key in responseScores.overlap) {
                  var nodeIds = responseScores.overlap[key];

                  for (var index in nodeIds) {
                      overlappedIDs.push(nodeIds[index]);
                  }
              }
          }

          for (var i = 0; i < rawCX.length; i++) {
              var fragment = rawCX[i];
              if (fragment) {
                  var aspectName;
                  for (aspectName in fragment) {

                      var elements = fragment[aspectName];

                      if (aspectName === 'numberVerification') {

                          numberVerification.push(fragment);

                      } else if (aspectName === 'status') {

                          status = fragment;

                      } else if (aspectName === 'metaData') {

                          if (metadata1.length === 0) {
                              metadata1.push(fragment);
                          } else {
                              metadata2.push(fragment);
                          }
                      }

                      for (var j = 0; j < elements.length; j++) {
                          var element = elements[j];
                          handleCxElement(aspectName, element, niceCX);
                      }
                  }
              }
          }

          this.markInQueryNodes(niceCX, overlappedIDs);

          var backToRawCX = [];

          backToRawCX.push(numberVerification[0]);
          backToRawCX.push(metadata1[0]);

          this.niceCXToRawCX(niceCX, backToRawCX);

          backToRawCX.push(metadata2[0]);
          backToRawCX.push(status);

          
          return backToRawCX;
      };


      this.niceCXToRawCX = function(niceCX, backToRawCX) {

          for (var aspectName in niceCX) {
              if ((aspectName === 'metaData') || (aspectName === 'numberVerification') ||
                  (aspectName === 'status')) {
                  continue;

              } else if (aspectName === 'nodeAttributes') {

                  var arrayOfNodeIDs = Object.keys(niceCX[aspectName].nodes);

                  for (var j = 0; j <  arrayOfNodeIDs.length; j++) {

                      var nodeId = arrayOfNodeIDs[j];
                      var nodeAttributeMap  = niceCX[aspectName].nodes[nodeId];

                      var arrayOfAttributeNames = Object.keys(nodeAttributeMap);

                      for (var k = 0; k < arrayOfAttributeNames.length; k++) {
                          var attributeName = arrayOfAttributeNames[k];

                          var attributeObject = nodeAttributeMap[attributeName];
                          var nodeAttributeElement = {po : nodeId, n : attributeName, v : attributeObject.v};

                          if (attributeObject.d) {
                              nodeAttributeElement.d = attributeObject.d;
                          }

                          var fragment = {
                              'nodeAttributes': [ nodeAttributeElement ]
                          };

                          backToRawCX.push(fragment);
                      }
                  }

              } else {

                  var arrayOfElements = niceCX[aspectName].elements;

                  for (var l = 0; l < arrayOfElements.length; l++) {

                      var element = arrayOfElements[l];

                      var fragment1 = {};
                      fragment1[aspectName] = [];
                      fragment1[aspectName].push(element);

                      backToRawCX.push(fragment1);
                  }
                  

              }

              console.log('aspectName=' + aspectName);
          }

      };



      // setNodeAttribute(nodeId, attributeName, attributeValue, attributeDataType)

      this.markInQueryNodes = function(niceCX, overlappedIDs) {
          if (!overlappedIDs) {
              return;
          }

          var dataType;

          for (var i = 0; i < overlappedIDs.length; i++) {
              var nodeId = overlappedIDs[i];
              this.setNodeAttribute(niceCX, nodeId, "inQuery", 'true'   );
          }
      };


      this.setNodeAttribute = function(niceCX, nodeId, attributeName, attributeValue, attributeDataType) {

          if (!attributeName || !attributeValue) {
              return;
          }

          var attributeObject = {v : attributeValue};

          if (attributeDataType) {
              attributeObject.d = attributeDataType;
          }

          if (!niceCX.nodeAttributes.nodes[nodeId]) {
              niceCX.nodeAttributes.nodes[nodeId] = {};
          }

          niceCX.nodeAttributes.nodes[nodeId][attributeName] =  attributeObject;
      };


      var handleCxElement = function (aspectName, element, niceCX) {

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

              attributes[element.n] = {v: element.v, d : element.d};
              
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
