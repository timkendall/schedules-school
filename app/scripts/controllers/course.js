'use strict';

angular.module('schedulesSchool')
  .controller('CourseCtrl', function ($scope, Course) {

    var school = '543f2167cc91ba0b1cd8eb0c'; // hardcode chapman for now
    Course.findAll({school: school}).then(function (courses) {
        $scope.courses = courses;
    });
    $scope.unbindCourses = Course.bindAll($scope, 'courses');

  });
