'use strict';
/**
 * @ngdoc function
 * @name schedules.controller:CourseCtrl
 * @description
 * # CatalogCtrl
 */
angular.module('schedulesSchool').controller('CourseCtrl', function ($scope, loadCourse, Section, Professor, DS, $http) {
    // UI variable to hide/show form
    $scope.creatingSection = false;
    $scope.course = loadCourse;
    /*
     * Get all professors
     */
    var school = '543f2167cc91ba0b1cd8eb0c'; // hardcode chapman for now
    Professor.findAll({
        school: school
    }).then(function(professors) {
        $scope.professors = professors;

        /*
         * Deep link professor relations
         */
        angular.forEach($scope.course.sections, function(section) {
            var professor = _.find($scope.professors, function(professor) {
                return professor.id == section.professor
            });
            if (professor) section.professor = professor;
        })
    });
    $scope.unbindCourses = Professor.bindAll($scope, 'professors');

    $scope.formatProfessorSelection = function(model) {
        if (!model) return '';
        return model.firstName + ' ' + model.lastName;
    }
    /*
     * Form submission for creating new course
     */
    var formated = {};
    $scope.section = {
        course: $scope.course.id,
        meets: []
    };
    $scope.submit = function() {
        /*
         * Have to create a seperate object to hold formated data
         */
        var section = {};
        section.course = $scope.section.course;
        section.meets = $scope.section.meets;
        section.start = formated.start;
        section.end = formated.end;
        section.professor = formated.professor;
        console.log(section)
        // Save it
        Section.create(section).then(function(section) {
            /*
             * TODO: Should implement relations with angualr-data so this happens automatically
             */
            if (!$scope.course.sections) {
                $scope.course.sections = [];
                $scope.course.sections.push(section);
            } else {
                $scope.course.sections.push(section);
            }
            // The new course is created and in the data store (ex. Section.get(section.id); )
            $scope.section = {
                course: $scope.course.id,
                meets: [],
                start: null,
                end: null
            };
            formated = {};
        }).
        catch (function(error) {
            console.log(error);
        });
    }
    /*
     * Update function
     */

      /*
     * This gets called *after* a model has been updated locally
     */
    $scope.afterSave = function (section) {
      return  $http.post('http://107.170.253.85:1337/section/' + section.id, {professor: section.professor.id });
    }
    /*
     * Function for selecting/unselecting days
     */
    $scope.toggleSelection = function toggleSelection(day) {
        var idx = $scope.section.meets.indexOf(day);
        // is currently selected
        if (idx > -1) {
            $scope.section.meets.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.section.meets.push(day);
        }
    };
    /*
     * Data formater for start/end time
     */
    $scope.$watch('section.start', function(newVal, oldVal) {
        if (typeof newVal === 'object') {
            // Format time
            formated.start = getTwentyFourHourTime(newVal);
        }
    });
    $scope.$watch('section.end', function(newVal, oldVal) {
        if (typeof newVal === 'object') {
            // Format time
            formated.end = getTwentyFourHourTime(newVal);
        }
    });
    $scope.$watch('section.professor', function(newVal, oldVal) {
        if (typeof newVal === 'object') {
            // Format time
            formated.professor = newVal.id;
        }
    });

    function getTwentyFourHourTime(date) {
        if (typeof date !== 'object') throw new Error('Expected a Date object')
        if (!date) return null;
        // Convert to hours (24) string
        var hours = date.getHours();
        var hoursString = hours < 10 ? '0' + hours.toString() : hours.toString();
        // Convert to minutes string
        var minutes = date.getMinutes();
        var minutesString = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
        return parseInt(hoursString + minutesString);
    }
});