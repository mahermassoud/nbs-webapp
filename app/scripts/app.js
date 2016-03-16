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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
