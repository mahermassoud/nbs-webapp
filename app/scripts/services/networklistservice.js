'use strict';

/**
 * @ngdoc service
 * @name ndexCravatWebappApp.networkListService
 * @description
 * # networkListService
 * Service in the ndexCravatWebappApp.
 */
angular.module('ndexCravatWebappApp')
  .service('networkListService', function networkListService() {

      // [1] Helper: Load networklists from localStorage
      var loadModel = function () {
        var model = {
          networklists: localStorage['StockDog.networklists'] ? JSON.parse(localStorage['StockDog.networklists']) : [],
          nextId: localStorage['StockDog.nextId'] ? parseInt(localStorage['StockDog.nextId']) : 0
        };
        return model;
      };


      // [2] Helper: Save networklists to localStorage
      var saveModel = function () {
        localStorage['StockDog.networklists'] = JSON.stringify(Model.networklists);
        localStorage['StockDog.nextId'] = Model.nextId;
      };


      // [3] Helper: Use lodash to find a watchlist with given ID
      var findById = function (listId) {
        return _.find(Model.networklists, function (watchlist) {
          return watchlist.id === parseInt(listId);
        });
      };


      // [4] Return all networklists or find by given ID
      this.query = function (listId) {
        if (listId) {
          return findById(listId);
        } else {
          return Model.networklists;
        }
      };


      // [5] Save a new watchlist to networklists model
      this.save = function (watchlist) {
        watchlist.id = Model.nextId++;
        Model.networklists.push(watchlist);
        saveModel();
      };


      // [6] Remove given watchlist from networklists model
      this.remove = function (watchlist) {
        _.remove(Model.networklists, function (list) {
          return list.id === watchlist.id;
        });
        saveModel();
      };


      // [7] Initialize Model for this singleton service
      var Model = loadModel();
    });
