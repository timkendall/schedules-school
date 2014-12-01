'use strict';
angular.module('schedulesSchool').controller('CoursesCtrl', function ($scope, $location, $q, Course) {


    /*
     * This gets called *after* a model has been updated locally
     */
    $scope.afterSave = function (course) {
      console.log(course)
      var deferred = $q.defer();

      /*
       * Note: Must include 'changesOnly: true' to avoid sending populated models and failing update
       * Note 2: Ideally this would be called before the model was saved locally however I ran into problems because Course looks at the local model for changes
       * which aren't there. Need to remedy this in the future.
       */
      Course.save(course.id, {changesOnly: true}).then(function (document) {
        deferred.resolve();
      }).catch(function (error) {
       console.log(error)
          deferred.reject('Failed to save to server!');
      });

      return deferred.promise;
    }

    // UI variable to hide/show form
    $scope.creatingCourse = false;

    // Handle table clicks
    $scope.go = function (course) {
      $location.path('/courses/' + course.id);
    }

    /*
     * Load up courses from Course service
     */

    var school = '543f2167cc91ba0b1cd8eb0c'; // hardcode chapman for now
    Course.findAll({
        school: school
    }).then(function(courses) {
        $scope.courses = courses;
    });
    $scope.unbindCourses = Course.bindAll($scope, 'courses');

    /*
     * Form stuff for creating new course
     */
    $scope.course = { school: school };
    $scope.submit = function() {
      Course.create($scope.course).then(function (course) {
        // The new course is created and in the data store (ex. Course.get(course.id); )
        $scope.course = { school: school };
      }).catch(function (error) {
        console.log(error);
      });
    }
});