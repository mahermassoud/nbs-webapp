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

        setResponseScores: function (responseScores) {
            var jsonObj = JSON.stringify(responseScores);
            sessionStorage.setItem('responseScores', jsonObj);
        },

        getAllResponseScores: function () {
            var responseScores = JSON.parse(sessionStorage.getItem('responseScores'));
            return responseScores;
        },

        getResponseScores: function (networkUUID) {
            var responseScores = this.getAllResponseScores();
            return (responseScores) ? responseScores[networkUUID] : null;
        },

        setCravatData: function (cravatData) {
            var jsonObj = JSON.stringify(cravatData);
            sessionStorage.setItem('cravatData', jsonObj);
        },

        getCravatData: function () {
            var cravatData = JSON.parse(sessionStorage.getItem('cravatData'));
            return cravatData;
        },

        setCravatFileName: function(cravatFileName) {
            sessionStorage.setItem('cravatFileName', cravatFileName);
        },

        getCravatFileName: function() {
            return sessionStorage.getItem('cravatFileName');
        },

        removeItemFromSessionStorage: function(item) {
            sessionStorage.removeItem(item);
        }

    };

  });
