'use strict';
angular.module('schedulesSchool').controller('LoginCtrl', function($scope, auth, store, $state) {
    $scope.auth = auth;

    // User login (launch Auth0 modal)
   auth.signin({showSignup: true}, function (profile, token) {
            console.log(profile)
            // Success callback
            store.set('profile', profile);
            store.set('token', token);
           $state.go('courses.all');
        }, function() {
            // Error callback
        });
    $scope.signup = function () {
      auth.signup({}, function (profile, token) {
            // Success callback
            store.set('profile', profile);
            store.set('token', token);
            $location.path('/');
        }, function() {
            // Error callback
        });
    }
    // Simple logout function
    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
    }
});
