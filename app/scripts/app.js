'use strict';

angular.module('schedulesSchool', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'angular-data.DS', 'ui.bootstrap', 'xeditable'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
     // Find courses
    .state('courses', {
       abstract: true,
       url: '/courses',
       templateUrl: 'partials/courses/main.html',
       controller: 'CoursesCtrl'
    })

    // Find courses to add
    .state('courses.all', {
        url: '/all',
        templateUrl: 'partials/courses/all.html'
    })
     .state('courses.single', {
        url: '/:courseId',
        templateUrl: 'partials/courses/single.html',
        controller: 'CourseCtrl',
        resolve: {
            loadCourse: function($q, $stateParams, $window, $location, Course) {
                var deferred = $q.defer();
                var params = {
                  where: {
                    school: {
                      '==': '543f2167cc91ba0b1cd8eb0c'
                    }
                  }
                };
                var course = null;
                // Try and find the requested course
                Course.findAll(params).then(function(courses) {
                    course = _.find(Course.filter(), function(course) {
                        return course.id == $stateParams.courseId
                    });
                    if (course) {
                        console.log(course)
                        deferred.resolve(course);
                    } else {
                        $location.path('/courses/all')
                        deferred.reject(new Error("Can't find course with ID " + $stateParams.courseId));
                    }
                }).
                catch (function(error) {
                    console.log(error)
                });

                return deferred.promise;
            }
        }
    })

      .state('majors', {
        url: '/majors',
        templateUrl: 'partials/majors.html',
        controller: 'MajorsCtrl'
      })

      .state('professors', {
        url: '/professors',
        templateUrl: 'partials/professors.html',
        controller: 'ProfessorsCtrl'
      })

      .state('terms', {
        url: '/terms',
        templateUrl: 'partials/terms.html',
        controller: 'CoursesCtrl'
      });

    $urlRouterProvider.otherwise('/courses/all');
  })
  .run(function ($rootScope, $state, editableOptions, editableThemes) {
    // Catch state change errors
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log(error)
    });

    // Make $state available everywhere for UI
    $rootScope.$state = $state;

    // Setup templates/styles for xeditable
    // set `default` theme
    editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});
