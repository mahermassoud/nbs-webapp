'use strict';

/**
 * @ngdoc overview
 * @name ndexCravatWebappApp
 * @description
 * # ndexCravatWebappApp
 *
 * Main module of the application.
 */
angular
  .module('ndexCravatWebappApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/view', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl',
        controllerAs: 'view'
      })
      .when('/view/:networkId', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl',
        controllerAs: 'view'
      })
      .when('/watchlist', {
        templateUrl: 'views/watchlist.html',
        controller: 'WatchlistCtrl',
        controllerAs: 'watchlist'
      })
      .when('/cravat', {
        templateUrl: 'views/cravat.html',
        controller: 'CravatCtrl',
        controllerAs: 'cravat'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
