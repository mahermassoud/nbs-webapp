'use strict';

/**
 * @ngdoc service
 * @name ndexCravatWebappApp.sharedProperties
 * @description
 * # sharedProperties
 * Service in the ndexCravatWebappApp.
 */
angular.module('ndexCravatWebappApp')
  .service('sharedProperties', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      getAllResponseScores: function () {
          var responseScores = JSON.parse(sessionStorage.getItem('responseScores'));
          return responseScores;
       },

      getResponseScores: function (networkUUID) {
          var responseScores = this.getAllResponseScores();
        if (responseScores){
          return responseScores[networkUUID];
        } else {
          return null;
        }

      },

      setResponseScores: function (responseScores) {
          var jsonObj = JSON.stringify(responseScores);
          sessionStorage.setItem('responseScores', jsonObj);
       }
    };
  });
