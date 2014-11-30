'use strict';

angular.module('schedulesSchool').factory('Course', ['DS',
    function (DS) {
      var Course = DS.defineResource({
        name: 'course',
        baseUrl: 'http://107.170.253.85:1337/',

        methods: {
          // Nice create method
        }
      });


      return Course;
    }
]);