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
          templateUrl: 'views/analysis.html',
          controller: 'AnalysisCtrl',
          controllerAs: 'analysis'
      })
      .when('/analysis', {
          templateUrl: 'views/analysis.html',
          controller: 'AnalysisCtrl',
          controllerAs: 'analysis'
      })
      .when('/visualize/:networkUUID', {
        templateUrl: 'views/visualize.html',
        controller: 'VisualizeCtrl',
        controllerAs: 'visualize'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
