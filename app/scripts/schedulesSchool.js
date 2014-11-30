'use strict';

angular.module('schedulesSchool', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'angular-data.DS'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('courses', {
        url: '/courses',
        templateUrl: 'partials/courses.html',
        controller: 'CourseCtrl'
      })

      .state('majors', {
        url: '/majors',
        templateUrl: 'partials/majors.html',
        controller: 'MainCtrl'
      })

      .state('professors', {
        url: '/professors',
        templateUrl: 'partials/professors.html',
        controller: 'MainCtrl'
      })

      .state('terms', {
        url: '/terms',
        templateUrl: 'partials/terms.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/courses');
  })
;
