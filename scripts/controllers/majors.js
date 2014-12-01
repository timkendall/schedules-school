'use strict';
angular.module('schedulesSchool').controller('MajorsCtrl', function ($scope, $location, $q, Major) {


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
      Major.save(course.id, {changesOnly: true}).then(function (document) {
        deferred.resolve();
      }).catch(function (error) {
       console.log(error)
          deferred.reject('Failed to save to server!');
      });

      return deferred.promise;

    }

    // UI variable to hide/show form
    $scope.creatingMajor = false;


    /*
     * Load up professors from Professor service
     */

    var school = '543f2167cc91ba0b1cd8eb0c'; // hardcode chapman for now
    Major.findAll().then(function (majors) {
        $scope.majors = majors;
    });
    $scope.unbindMajors = Major.bindAll($scope, 'majors');

    /*
     * Form stuff for creating new course
     */
    $scope.major = { school: school };
    $scope.submit = function() {
      Major.create($scope.major).then(function (major) {
        // The new major is created and in the data store (ex. major.get(major.id); )
        $scope.major = { school: school };
      }).catch(function (error) {
        console.log(error);
      });
    }
});