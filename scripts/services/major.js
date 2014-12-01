'use strict';

angular.module('schedulesSchool').factory('Major', ['DS',
    function (DS) {
      var Major = DS.defineResource({
        name: 'major',
        baseUrl: 'http://107.170.253.85:1337/',

        methods: {
          // Nice create method
        }
      });


      return Major;
    }
]);