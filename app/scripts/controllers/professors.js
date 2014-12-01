'use strict';
angular.module('schedulesSchool').controller('ProfessorsCtrl', function ($scope, $location, $q, Professor) {


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
      Professor.save(course.id, {changesOnly: true}).then(function (document) {
        deferred.resolve();
      }).catch(function (error) {
       console.log(error)
          deferred.reject('Failed to save to server!');
      });

      return deferred.promise;

    }

    // UI variable to hide/show form
    $scope.creatingProfessor = false;


    /*
     * Load up professors from Professor service
     */

    var school = '543f2167cc91ba0b1cd8eb0c'; // hardcode chapman for now
    Professor.findAll({
        school: school
    }).then(function (professors) {
        $scope.professors = professors;
    });
    $scope.unbindProfessors = Professor.bindAll($scope, 'professors');

    /*
     * Form stuff for creating new course
     */
    $scope.professor = { school: school };
    $scope.submit = function() {
      Professor.create($scope.professor).then(function (professor) {
        // The new professor is created and in the data store (ex. Professor.get(professor.id); )
        $scope.professor = { school: school };
      }).catch(function (error) {
        console.log(error);
      });
    }
});