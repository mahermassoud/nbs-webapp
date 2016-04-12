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
      .when('/viewnicecx/:networkUUID', {
        templateUrl: 'views/nicecx.html',
        controller: 'NiceCxCtrl',
        controllerAs: 'niceCx'
      })
      .when('/markNiceCX/:networkUUID', {
        templateUrl: 'views/mark-nice-cx.html',
        controller: 'MarkNiceCxCtrl',
        controllerAs: 'markNiceCx'
      })
      .when('/niceCXtoRawCX/:networkUUID', {
        templateUrl: 'views/nice-cx-to-raw-cx.html',
        controller: 'NiceCxToRawCxCtrl',
        controllerAs: 'niceCxToRawCx'
      })
      .when('/visualizeOriginal/:networkUUID', {
        templateUrl: 'views/visualize-original.html',
        controller: 'VisualizeOriginalCtrl',
        controllerAs: 'visualizeOriginal'
      })
      .when('/visualizeEnriched/:networkUUID', {
        templateUrl: 'views/visualize-enriched.html',
        controller: 'VisualizeEnrichedCtrl',
        controllerAs: 'visualizeEnriched'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
