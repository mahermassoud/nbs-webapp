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
          templateUrl: 'views/cravat.html',
          controller: 'CravatCtrl',
          controllerAs: 'cravat'
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
