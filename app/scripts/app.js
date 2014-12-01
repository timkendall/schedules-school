'use strict';

angular.module('schedulesSchool', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'angular-data.DS', 'angular-storage', 'ui.bootstrap', 'xeditable', 'angular-jwt', 'auth0'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, authProvider, jwtInterceptorProvider) {
     // Configure Auth0 authentication
    authProvider.init({
        domain: 'schedules.auth0.com',
        clientID: 'hHXmSgTUz2Cfv1LwjTLPgVcUoY8QBnls',
        loginState: 'login'
    });
    // Configure $http interceptors (send user's token for every API call)
    jwtInterceptorProvider.tokenGetter = function(store) {
        // Return the saved token
        return store.get('token');
    }
    //$httpProvider.interceptors.push('jwtInterceptor');

    $stateProvider
     // Find courses
    .state('courses', {
       abstract: true,
       url: '/courses',
       templateUrl: 'partials/courses/main.html',
       controller: 'CoursesCtrl',
       data: {
          requiresLogin: true
        }
    })

    // Find courses to add
    .state('courses.all', {
        url: '/all',
        templateUrl: 'partials/courses/all.html',
        data: {
          requiresLogin: true
        }
    })
     .state('courses.single', {
        url: '/:courseId',
        templateUrl: 'partials/courses/single.html',
        controller: 'CourseCtrl',
        data: {
          requiresLogin: true
        },
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
        controller: 'MajorsCtrl',
        data: {
          requiresLogin: true
        }
      })

      .state('professors', {
        url: '/professors',
        templateUrl: 'partials/professors.html',
        controller: 'ProfessorsCtrl',
        data: {
          requiresLogin: true
        }
      })

      .state('terms', {
        url: '/terms',
        templateUrl: 'partials/terms.html',
        controller: 'CoursesCtrl',
        data: {
          requiresLogin: true
        }
      })

      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      });

    $urlRouterProvider.otherwise('/courses/all');
  })
  .run(function ($rootScope, $state, editableOptions, editableThemes, auth, store, jwtHelper) {
    // Catch state change errors
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log(error)
    });

    // Make $state available everywhere for UI
    $rootScope.$state = $state;
    $rootScope.auth = auth;

    // Setup templates/styles for xeditable
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();
    // Maintain a user's login on page refresh
    $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $state.go('login');
        }
      }
    }

  });
});
